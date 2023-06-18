import { resolve } from 'path';

import { Command, Ctx, Hears, Start, Update } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';

import { IBotContext } from '../../interfaces/bot.interface';
import { UserService } from '../user/user.service';
import { BotConstants } from './bot.constants';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly userService: UserService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.reply(
      "Hello! I'm a Mizuno.\nTelegram bot for downloading youtube videos and music",
      this.botService.keyboard,
    );

    await this.userService.save(ctx.message.from.username);
  }

  @Hears('Configure⚙️')
  async setConfiguration(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.scene.enter(BotConstants.ConfigurationScene);
  }

  @Command('stop')
  async stopConfiguration(@Ctx() ctx: Scenes.SceneContext) {
    ctx.scene.leave();
  }

  @Hears('Make magic✨')
  async extractAudio(@Ctx() ctx: IBotContext) {
    const user = await this.userService.getUserWithConfiguration(
      ctx.message.from.username,
    );

    await this.botService.moveLastDownloadedFiles(user.id);

    const basicFileName = `${user.configuration.currentName}-${user.configuration.currentEpisode}`;

    await new Promise((r) => setTimeout(r, 5000));

    const repliedMsg = await ctx.reply('Processing...');

    await this.botService.extractAudioFromVideo(
      resolve('assets', `${basicFileName}-dub.mp4`),
      resolve('assets', 'extracted', `${basicFileName}.mp3`),
    );

    await this.botService.mergeAudioWithVideo(
      resolve('assets', `${basicFileName}-sub.mp4`),
      resolve('assets', 'extracted', `${basicFileName}.mp3`),
      resolve('assets', 'merged', `${basicFileName}.mp4`),
    );

    await ctx.deleteMessage(repliedMsg.message_id);

    await ctx.reply('Finished🔥');

    await this.userService.updateEpisode(user.id);
  }
}
