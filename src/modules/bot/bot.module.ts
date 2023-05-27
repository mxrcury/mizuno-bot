import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { botOptions } from 'src/config/bot.config';
import { FilesModule } from '../files/files.module';
import { PrismaModule } from '../prisma/prisma.module';
import { YoutubeModule } from '../youtube/youtube.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';

@Module({
  imports: [
    TelegrafModule.forRoot(botOptions),
    YoutubeModule,
    HttpModule,
    FilesModule,
    PrismaModule,
  ],
  providers: [BotUpdate, BotService],
})
export class BotModule {}
