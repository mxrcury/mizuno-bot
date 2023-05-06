import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { IBotContext, IMessage } from '../../interfaces/bot.interface';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async start(@Ctx() ctx: IBotContext) {
    await ctx.reply(
      "Hello! I'm a Mizuno.\nTelegram bot for downloading youtube videos and music",
    );
  }

  @On('message')
  async message(@Ctx() ctx: IBotContext, @Message() msg: IMessage) {
    const file = await this.botService.handleLink(msg.text);
    await ctx.reply('😄:');
    await ctx.replyWithAudio({
      url: file.url,
      filename: file.filename,
    });
  }
}
