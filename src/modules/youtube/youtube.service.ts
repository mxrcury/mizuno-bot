import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
const request = require('youtube-dl-exec');

@Injectable()
export class YoutubeService {
  constructor(private readonly httpService: HttpService) {}
  async getAudio(link: string) {
    const response = await request(
      'https://www.youtube.com/watch?v=8Er6l7UOnbI&ab_channel=TrapCity',
      {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        f: 'bestaudio[ext=m4a]',
        addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
        playlistItems: '1',
        downloader: 'aria2c',
      },
    );
    const url = response.requested_downloads[0].url;
    // const filename = response.title
    //   .split(' ')
    //   .map((t) => t[0].toUpperCase() + t.slice(1))
    // .join(' ');

    const file = await firstValueFrom(this.httpService.get<any>(url));
    console.log(file);

    // await writeFile('url' + '.m4a', file.data);

    return { url, filename: response.title };
  }
}
