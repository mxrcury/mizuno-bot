import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { YoutubeService } from '../youtube/youtube.service';

@Injectable()
export class BotService {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly fileService: FilesService,
  ) {}

  async handleLink(link: string) {
    return this.youtubeService.getAudio(link);
  }
  private validateLink(link: string) {
    const regexp = new RegExp(/w/);
    return regexp.test(link);
  }

  async extractAudioFromVideo(video: string, audio: string) {
    await this.fileService.extractAudioFromVideo(video, audio);
  }

  async mergeAudioWithVideo(
    originVideo: string,
    originAudio: string,
    outputVideo: string,
  ) {
    await this.fileService.mergeAudioWithVideo({
      originVideo,
      originAudio,
      outputVideo,
    });
  }

  parseCommandArgs(args: string) {
    const parsed = args.split(' ');

    const video = parsed[1];
    const audio = parsed[2];
    const videoSub = parsed[3];
    return {
      video,
      audio,
      videoSub,
      ...(parsed[4] && { outputVideo: parsed[4] }),
    };
  }
}
