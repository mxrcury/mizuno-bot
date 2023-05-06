import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { botOptions } from './config/bot.config';

@Module({
  imports: [TelegrafModule.forRoot(botOptions)],
  providers:[BotService]
})

export class BotModule {}
