import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { botOptions } from 'src/config/bot.config';
import { FilesModule } from '../files/files.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { ConfigurationWizard } from './bot.wizard';

@Module({
  imports: [
    TelegrafModule.forRoot(botOptions),
    HttpModule,
    FilesModule,
    PrismaModule,
    UserModule,
  ],
  providers: [BotUpdate, BotService, ConfigurationWizard],
})
export class BotModule {}
