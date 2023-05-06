import { BotOptions } from "src/interfaces/bot.interface";
import { env } from ".";

export const botOptions:BotOptions = { token: env.BOT_TOKEN }