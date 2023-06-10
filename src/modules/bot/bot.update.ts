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
    console.log('current ->', ctx.scene.current);

    ctx.scene.leave();
  }

  @Hears('Make magic✨')
  async extractAudio(@Ctx() ctx: IBotContext) {
    const user = await this.userService.getUserWithConfiguration(
      ctx.message.from.username,
    );

    await this.botService.moveLastDownloadedFiles(user.id);

    // for update ---
    // await this.botService.extractAudioFromVideo(
    //   resolve('assets', parsedArgs.video),
    //   resolve('assets', 'audio', parsedArgs.audio),
    // );
    // await this.botService.mergeAudioWithVideo(
    //   resolve('assets', parsedArgs.videoSub),
    //   resolve('assets', 'audio', parsedArgs.audio),
    //   resolve('assets', 'merged', parsedArgs.outputVideo),
    // );

    await ctx.reply('Finished🔥');
  }
}
