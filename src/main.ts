import { NestFactory } from '@nestjs/core';
import { BotModule } from './modules/bot/bot.module';

async function main() {
  await NestFactory.createApplicationContext(BotModule);
}

main();
