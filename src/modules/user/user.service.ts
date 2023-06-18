import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserWithConfiguration(username: string) {
    return await this.prismaService.user.findFirst({
      where: { username },
      include: { configuration: true },
    });
  }

  async save(username: string) {
    const userExists = await this.prismaService.user.findFirst({
      where: { username },
    });

    if (!userExists) {
      return await this.prismaService.user.create({ data: { username } });
    }
  }

  async updateEpisode(userId: string) {
    await this.prismaService.configuration.update({
      where: { userId },
      data: { currentEpisode: { increment: 1 } },
    });
  }
}
