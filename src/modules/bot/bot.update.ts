import { Command, Ctx, Start, Update } from 'nestjs-telegraf';

import { HttpService } from '@nestjs/axios';
import { IBotContext } from '../../interfaces/bot.interface';
import { YoutubeService } from '../youtube/youtube.service';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly httpService: HttpService,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Start()
  async start(@Ctx() ctx: IBotContext) {
    await ctx.reply(
      "Hello! I'm a Mizuno.\nTelegram bot for downloading youtube videos and music",
    );
  }

  @Command('download')
  async download(@Ctx() ctx: IBotContext) {
    console.time('Downloading-video-audio');
    const link = ctx.update.message.text.split(' ')[1];
    const video = (await this.youtubeService.getAudio(link)) as Buffer;

    console.timeEnd('Downloading-video-audio');
    await ctx.replyWithAudio({ source: video, filename: 'some-file.mp3' });
  }

  // @Command('extractAudio')
  // async extractAudio(@Ctx() ctx: IBotContext) {
  //   ctx.reply('Welcome! Please enter your name:');
  //   const parsedArgs = this.botService.parseCommandArgs(
  //     ctx.update.message.text,
  //   );

  //   await this.botService.extractAudioFromVideo(
  //     resolve(...parsedArgs.video.split('/')),
  //     resolve(...parsedArgs.audio.split('/')),
  //   );
  //   await this.botService.mergeAudioWithVideo(
  //     resolve(...parsedArgs.videoSub.split('/')),
  //     resolve(...parsedArgs.audio.split('/')),
  //     resolve(...parsedArgs.outputVideo.split('/')),
  //   );

  //   await ctx.reply('Finished🔥');
  // }
}
