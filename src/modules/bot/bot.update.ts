import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { resolve } from 'path';
import { IBotContext } from '../../interfaces/bot.interface';
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

  @Command('extractAudio')
  async extractAudio(@Ctx() ctx: IBotContext) {
    const parsedArgs = this.botService.parseCommandArgs(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ctx.update.message.text,
    );
    console.log(resolve('assets', 'audio-dub.mp4'));

    await this.botService.extractAudioFromVideo(
      resolve(...parsedArgs.video.split('/')),
      resolve(...parsedArgs.audio.split('/')),
    );
    await ctx.reply('Extracted');
  }

  @Command('mergeAudio')
  async mergeAudioWithVideo(@Ctx() ctx: IBotContext) {
    const parsedArgs = this.botService.parseCommandArgs(
      // TODO: avoid using ts ignore
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ctx.update.message.text,
    );
    await this.botService.mergeAudioToVideo(
      resolve(...parsedArgs.video.split('/')),
      resolve(...parsedArgs.audio.split('/')),
      resolve(...parsedArgs.outputVideo.split('/')),
    );
  }
  // TODO: refactor

  // @On('text')
  // async message(@Ctx() ctx: IBotContext, @Message() msg: IMessage) {
  //   // console.time('downloading from youtube');
  //   // const file = await this.botService.handleLink(msg.text);
  //   // console.timeEnd('downloading from youtube');
  //   // // if (file.url) {
  //   // const loadingMsg = await ctx.reply('Loading⏳ ' + file.url);
  //   // // working variant
  //   // // const rS = await createReadStream(file.url);
  //   // console.log(resolve(file.filename));
  //   // const path = resolve(file.filename);
  //   // const wS = await createWriteStream(path);

  //   // console.log(file, rS);
  //   // const rS = get({ href: file.url, e });
  //   // const res = await fetch(file.url);

  //   // await pipeline(res.body, wS);
  //   // console.log(path);

  //   // console.log(path);

  //   await ctx.replyWithAudio({
  //     url: 'https://firebasestorage.googleapis.com/v0/b/mizunob-fa8ec.appspot.com/o/videoplayback.mp4?alt=media&token=17df89b1-c95e-4fe3-91a0-445855ade208',
  //   });

  //   // const buffers = [];
  //   // rS.on('response', (res) => {
  //   // console.log(res);
  //   // });

  //   // node.js readable streams implement the async iterator protocol
  //   // for await (const data of rS) {
  //   //   buffers.push(data);
  //   // }

  //   // console.log(join(file.filename));

  //   // const sentAudio = await ctx.replyWithAudio({
  //   // source: resolve(file.filename),
  //   // });
  //   // await ctx.sendAudio({ url: file.url, filename: file.filename });
  //   // await ctx.deleteMessage(loadingMsg.message_id);
  //   // } else {
  //   // const errorMsg = await ctx.reply(
  //   // 'Something went wrong. Resend your link',
  //   // );
  //   // await new Promise((resolve) => setTimeout(resolve, 3000));
  //   // await ctx.deleteMessage(errorMsg.message_id);
  //   // }
  // }
}
