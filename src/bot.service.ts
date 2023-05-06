import { Ctx, Start, Update } from "nestjs-telegraf";
import { BotContext } from './interfaces/bot.interface';

@Update()
export class BotService {
    @Start()
    async start(@Ctx() ctx:BotContext) {
        await ctx.reply('Hello bro!')
    }
}