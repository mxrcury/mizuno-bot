import { Command, Ctx, Start, Update } from 'nestjs-telegraf';

import { HttpService } from '@nestjs/axios';
import { resolve } from 'path';
import { IBotContext } from '../../interfaces/bot.interface';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly httpService: HttpService,
  ) {}

  @Start()
  async start(@Ctx() ctx: IBotContext) {
    await ctx.reply(
      "Hello! I'm a Mizuno.\nTelegram bot for downloading youtube videos and music",
    );
  }

  @Command('extractAudio')
  async extractAudio(@Ctx() ctx: IBotContext) {
    ctx.reply('Welcome! Please enter your name:');
    const parsedArgs = this.botService.parseCommandArgs(
      ctx.update.message.text,
    );

    await this.botService.extractAudioFromVideo(
      resolve(...parsedArgs.video.split('/')),
      resolve(...parsedArgs.audio.split('/')),
    );
    await this.botService.mergeAudioWithVideo(
      resolve(...parsedArgs.videoSub.split('/')),
      resolve(...parsedArgs.audio.split('/')),
      resolve(...parsedArgs.outputVideo.split('/')),
    );

    await ctx.reply('Finished🔥');
  }
}
