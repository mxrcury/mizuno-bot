import { Ctx, Hears, Message, On, Wizard, WizardStep } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { WizardContext } from 'telegraf/typings/scenes';
import { PrismaService } from '../prisma/prisma.service';
import { BotConstants } from './bot.constants';
import { BotService } from './bot.service';

@Wizard(BotConstants.ConfigurationScene)
export class ConfigurationWizard {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly botService: BotService,
  ) {}

  @WizardStep(1)
  async onSceneEnter(@Ctx() ctx: WizardContext) {
    ctx.wizard.next();

    await ctx.reply(
      '🌏 Please send a name of your current Anime/Movie:',
      Markup.keyboard([['Stop']]),
    );
  }

  @On('text')
  @WizardStep(2)
  async onCurrentName(
    @Ctx() ctx: WizardContext,
    @Message() msg: { text: string },
  ): Promise<string> {
    ctx.wizard.state['currentName'] = msg.text;

    ctx.wizard.next();
    return 'Please send current episode:';
  }

  @On('text')
  @WizardStep(3)
  async onCurrentEpisode(
    @Ctx() ctx: WizardContext & { wizard: { state: { currentName: string } } },
    @Message() msg: { text: string },
  ) {
    const currentEpisode = Number(msg.text);

    if (isNaN(currentEpisode)) {
      await ctx.reply('Wrong! Please enter a number of episode🛑');
      ctx.scene.reset();
      ctx.scene.reenter();
    }

    const user = await this.prismaService.user.findFirst({
      where: { username: ctx.message.from.username },
    });

    const { currentName } = ctx.wizard.state;

    await this.prismaService.configuration.upsert({
      where: { userId: user.id },
      update: { currentEpisode, currentName },
      create: { currentEpisode, currentName, userId: user.id },
    });

    await ctx.scene.leave();

    await ctx.reply(
      'Configuration has been finished!🍎',
      this.botService.keyboard,
    );

    await ctx.scene.leave();
  }

  @Hears('Stop')
  async onStop(
    @Ctx() ctx: WizardContext & { wizard: { state: { currentName: string } } },
    @Message() msg: { text: string },
  ) {
    ctx.scene.reset();
    ctx.reply('Configuration was stopped', this.botService.keyboard);
  }
}
