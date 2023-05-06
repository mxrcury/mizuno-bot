import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { botOptions } from '../../config/bot.config';
import { YoutubeModule } from '../youtube/youtube.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';

@Module({
  imports: [TelegrafModule.forRoot(botOptions), YoutubeModule, HttpModule],
  providers: [BotUpdate, BotService],
})
export class BotModule {}
