import { IBotOptions } from 'src/interfaces/bot.interface';
import { env } from '.';

export const botOptions: IBotOptions = { token: env.BOT_TOKEN };
