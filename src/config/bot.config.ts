import { IBotOptions } from 'src/interfaces/bot.interface';
import { session } from 'telegraf';
import { env } from '.';

export const botOptions: IBotOptions = {
  token: env.BOT_TOKEN,
  middlewares: [session()],
};
