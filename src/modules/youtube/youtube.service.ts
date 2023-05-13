/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
const ytdl = require('ytdl-core');

const request = require('youtube-dl-exec');
const yt = require('ytmp3-scrap');

@Injectable()
export class YoutubeService {
  downloader;
  constructor(private readonly httpService: HttpService) {}
  // onModuleInit() {
  // throw new Error('Method not implemented.');
  // }
  // onModuleInit() {}

  async getAudio(link: string) {
    const res = await ytdl(link, { filter: 'audioonly' });
    res.pipe(createWriteStream('audio.mp3'));
    // console.log(res.pipe());
    // const info = await ytdl.getInfo(link);
    // const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    // console.log('--', audioFormats);
  }

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
