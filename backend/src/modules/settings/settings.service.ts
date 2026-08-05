import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { UpdateSettingsDto } from "./dto/update-settings.dto";

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings(userId: string) {
    const settings = await this.prisma.userSettings.findUnique({
      where: {
        userId,
      },
    });

    if (!settings) {
      throw new NotFoundException("Settings not found");
    }

    return settings;
  }

  async updateSettings(userId: string, dto: UpdateSettingsDto) {
    const settings = await this.prisma.userSettings.findUnique({
      where: {
        userId,
      },
    });

    if (!settings) {
      throw new NotFoundException("Settings not found");
    }

    return this.prisma.userSettings.update({
      where: {
        userId,
      },
      data: {
        ...dto,
      },
    });
  }
}
