import * as fs from 'fs/promises';
import * as path from 'path';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { spawn } from 'child_process';
import { IExchangeAudio } from 'src/interfaces/files.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async moveLastDownloadedFiles(userId: string) {
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

        this.updateFilesNaming(userId, file, i + 1);
      });
  }

  private async updateFilesNaming(
    userId: string,
    file: Buffer,
    fileOrder: number,
  ) {
    const config = await this.prismaService.configuration.findFirst({
      where: { userId },
    });

    if (fileOrder === 1) {
      const newFilePath = path.resolve(
        'assets',
        config.currentName + '-' + config.currentEpisode + '-' + 'dub' + '.mp4',
      );
      console.log(newFilePath, file);

      await fs.writeFile(newFilePath, file);
    }
    if (fileOrder === 2) {
      const newFilePath = path.resolve(
        'assets',
        config.currentName + '-' + config.currentEpisode + '-' + 'sub' + '.mp4',
      );

      console.log(newFilePath, file);

      await fs.writeFile(newFilePath, file);
    }
  }

  async extractAudioFromVideo(video: string, audio: string) {
    return await new Promise((resolve) => {
      const response = spawn('ffmpeg', `-i ${video} ${audio}`.split(' '), {
        shell: true,
      });
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
