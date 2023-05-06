import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
const youtubeDl = require('youtube-dl-exec');

@Injectable()
export class YoutubeService {
  async getAudio(link: string) {
    const response = await youtubeDl(link, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      f: 'bestaudio[ext=m4a]',
      addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
      playlistItems: '1',
      downloader: 'aria2c',
    });
    const url = response.requested_downloads[0].url;
    const filename = response.title
      .split(' ')
      .map((t) => t[0].toUpperCase() + t.slice(1))
      .join(' ');
    console.log(url);
    console.log(filename);

    await writeFile('url' + '.m4a', url);

    return { url, filename };
  }
}
