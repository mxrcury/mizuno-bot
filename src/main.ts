import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';

async function main() {
  await NestFactory.createApplicationContext(BotModule)
}

main();
