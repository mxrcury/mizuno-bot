import { Injectable } from '@nestjs/common';
import { YoutubeService } from '../youtube/youtube.service';

@Injectable()
export class BotService {
  constructor(private readonly youtubeService: YoutubeService) {}

  async handleLink(link: string) {
    return this.youtubeService.getAudio(link);
  }
  private validateLink(link: string) {}
}
