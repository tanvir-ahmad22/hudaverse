import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";

@Injectable()
export class WorkspaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkspace(userId: string) {
    const workspace = await this.prisma.workspace.findFirst({
      where: {
        userId,
      },
    });

    if (!workspace) {
      throw new NotFoundException("Workspace not found");
    }

    return workspace;
  }

  async updateWorkspace(userId: string, dto: UpdateWorkspaceDto) {
    const workspace = await this.prisma.workspace.findFirst({
      where: {
        userId,
      },
    });

    if (!workspace) {
      throw new NotFoundException("Workspace not found");
    }

    return this.prisma.workspace.update({
      where: {
        id: workspace.id,
      },
      data: {
        ...dto,
      },
    });
  }
}
