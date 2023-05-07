import { Injectable } from '@nestjs/common';
import { YoutubeService } from '../youtube/youtube.service';

@Injectable()
export class BotService {
  constructor(private readonly youtubeService: YoutubeService) {}

  async handleLink(link: string) {
    // const isLinkValid = this.validateLink(link);
    // if (!isLinkValid) throw new Error('Entered link is not valid');
    return this.youtubeService.getAudio(link);
  }
  private validateLink(link: string) {
    const regexp = new RegExp(/w/);
    return regexp.test(link);
  }
}
