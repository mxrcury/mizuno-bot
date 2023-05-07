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

  @On('text')
  async message(@Ctx() ctx: IBotContext, @Message() msg: IMessage) {
    console.time('downloading');
    const file = await this.botService.handleLink(msg.text);
    console.timeEnd('downloading');
    if (file.url) {
      const loadingMsg = await ctx.reply('Loading⏳');
      // working variant
      // await ctx.replyWithAudio({
      //   url: file.url,
      //   filename: file.filename,
      // });
      await ctx.sendAudio({ url: file.url, filename: file.filename });
      await ctx.deleteMessage(loadingMsg.message_id);
    } else {
      const errorMsg = await ctx.reply(
        'Something went wrong. Resend your link',
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await ctx.deleteMessage(errorMsg.message_id);
    }
  }
}
