import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('youtube-dl-exec');

@Injectable()
export class YoutubeService {
  constructor(private readonly httpService: HttpService) {}
  async getAudio(link: string) {
    const response = await request(link, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      f: 'bestaudio[ext=m4a]',
      addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
      playlistItems: '1',
      externalDownloader: 'aria2c',
    });
    const url = response.requested_downloads[0].url;
    const filename = response.title;

    return { url, filename };
  }
}
