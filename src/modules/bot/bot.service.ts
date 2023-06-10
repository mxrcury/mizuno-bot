import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';
import { ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { FilesService } from '../files/files.service';

@Injectable()
export class BotService {
  keyboard: Markup.Markup<ReplyKeyboardMarkup> = Markup.keyboard([
    ['Make magic✨', 'Configure⚙️'],
  ]).resize(true);

  constructor(private readonly fileService: FilesService) {}

  async moveLastDownloadedFiles(userId: string) {
    this.fileService.moveLastDownloadedFiles(userId);
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
}
