import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            email: true,
            isActive: true,
            createdAt: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException("Profile not found");
    }

    return profile;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new NotFoundException("Profile not found");
    }

    return this.prisma.profile.update({
      where: {
        userId,
      },
      data: {
        ...dto,
      },
    });
  }
}
