import * as fs from 'fs/promises';
import * as path from 'path';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { spawn } from 'child_process';
import { IExchangeAudio } from 'src/interfaces/files.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Configuration } from '@prisma/client';

@Injectable()
export class FilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async moveLastDownloadedFiles(config: Configuration) {
    const downloadedPath = path.resolve('assets', 'downloaded');

    const files = await fs.readdir(downloadedPath);

    (
      await Promise.all(
        files.map(async function (file) {
          return {
            name: file,
            time: (
              await fs.stat(path.resolve(downloadedPath, file))
            ).mtime.getTime(),
          };
        }),
      )
    )
      .sort(function (a, b) {
        return a.time - b.time;
      })
      .map(async (f, i) => {
        const file = await fs.readFile(path.resolve(downloadedPath, f.name));

        if (f.name === '.DS_Store') return;

        if (i == 0) {
          await fs.writeFile(
            path.resolve(
              'assets',
              `${config.currentName}-${config.currentEpisode}-dub.mp4`,
            ),
            file,
          );
        }

        if (i == 1) {
          await fs.writeFile(
            path.resolve(
              'assets',
              `${config.currentName}-${config.currentEpisode}-sub.mp4`,
            ),
            file,
          );
        }
      });
  }

  async extractAudioFromVideo(video: string, audio: string) {
    console.log(video, audio);
    return await new Promise((resolve) => {
      const response = spawn('ffmpeg', `-i ${video} ${audio}`.split(' '), {
        shell: true,
      });

      console.log(response.pid);

      response.on('close', resolve);
      response.on('exit', resolve);
      response.stdout.on('error', (e) => {
        throw new InternalServerErrorException(
          'Something went wrong. ' + e.message,
        );
      });
    });
  }

  async mergeAudioWithVideo({
    originAudio,
    originVideo,
    outputVideo,
  }: IExchangeAudio) {
    return await new Promise((resolve) => {
      const response = spawn(
        `ffmpeg`,
        `-i ${originVideo} -i ${originAudio} -c:v copy -map 0:v:0 -map 1:a:0 ${outputVideo}`.split(
          ' ',
        ),
        { shell: true },
      );

      response.on('close', resolve);
      response.on('exit', resolve);

      response.stdout.on('error', (e) => {
        throw new InternalServerErrorException(
          'Something went wrong. ' + e.message,
        );
      });
    });
  }
}
