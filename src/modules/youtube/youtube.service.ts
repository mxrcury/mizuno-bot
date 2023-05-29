/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
const ytdl = require('ytdl-core');

const request = require('youtube-dl-exec');
const yt = require('ytmp3-scrap');

@Injectable()
export class YoutubeService {
  constructor(private readonly httpService: HttpService) {}

  async getAudio(link: string) {
    return new Promise(async (resolve, reject) => {
      const args = [
        link,
        '-x',
        '--audio-format',
        'mp3',
        '--audio-quality',
        '192K',
        '--audio-duration',
        '999999',
        '-o',
        '-',
        '--no-cache-dir',
      ];
      let i = 1;
      const res = spawn('yt-dlp', args);
      let stdout = Buffer.alloc(0);
      let stderr = Buffer.alloc(0);

      res.stdout.on('data', (data) => {
        console.log(i);
        i++;
        stdout = Buffer.concat([stdout, data]);
      });

      res.stderr.on('data', (data) => {
        stderr = Buffer.concat([stderr, data]);
      });

      res.on('close', (code) => {
        if (code === 0) {
          console.log('output');

          resolve(stdout);
        } else {
          const errorMessage = stderr.toString('utf8');
          reject(new Error(`Error extracting audio: ${errorMessage}`));
        }
      });
      // res.on('close', (code) => {
      //   if (code === 0) {
      //     resolve(stdout);
      //   } else {
      //     const errorMessage = stderr.toString('utf8');
      //     reject(new Error(`Error extracting audio: ${errorMessage}`));
      //   }
      // });
    });

    // s.stdout.on('error', (err) => {
    //   reject('Error');
    // });
    // s.stderr.on('error', (err) => {
    //   reject('err 2');
    // });
    // async $getAudio(link: string) {
    //   try {
    //     const response = await request(link, {
    //       dumpSingleJson: true,
    //       noCheckCertificates: true,
    //       noWarnings: true,
    //       f: 'bestaudio[ext=m4a]/m4a',
    //       addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    //       playlistItems: '1',
    //       externalDownloader: 'aria2c',
    //     });

    //     // const file = response.requested_formats.find((r) => r.audio_ext === 'webm');
    //     // const filename = response.title + `.${file.ext}`;

    //     // const path = resolve(filename);
    //     // const ws = await createWriteStream(path);

    //     // const re = await fetch(file.url);
    //     // re.body.pipe(ws);
    //     // await writeFile(filename)
    //     await writeFile('response.json', JSON.stringify(response));
    //     const url = response.requested_downloads[0].url;
    //     const filename =
    //       response.title + `.${response.requested_downloads[0].ext}`;

    //     console.log(url, filename);

    //     // const filename = response.title + `.${file.ext}`;

    //     const path = resolve(filename);

    //     console.log(path);

    //     const ws = await createWriteStream(path);
    //     const re = await get(url);
    //     // console.log(re);
    //     console.log(re);

    //     re.pipe(ws);

    //     return { url, filename };
    //   } catch (error) {
    //     console.log('ERR - ', error);
    //     return { url: '', filename: '' };
    //   }
    // }
  }
}
