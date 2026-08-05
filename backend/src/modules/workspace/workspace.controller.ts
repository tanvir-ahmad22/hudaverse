import { Controller, Get, Patch, Body, Req, UseGuards } from "@nestjs/common";

import { WorkspaceService } from "./workspace.service";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("workspace")
@UseGuards(JwtAuthGuard)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  async getWorkspace(@Req() req: any) {
    return this.workspaceService.getWorkspace(req.user.sub);
  }

  @Patch()
  async updateWorkspace(@Req() req: any, @Body() dto: UpdateWorkspaceDto) {
    return this.workspaceService.updateWorkspace(req.user.sub, dto);
  }
}
