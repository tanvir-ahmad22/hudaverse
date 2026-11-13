import { Controller, Get, Patch, Body, Req, UseGuards } from "@nestjs/common";

import { WorkspaceService } from "./workspace.service";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AuthenticatedRequest } from "../auth/interfaces/authenticated-request.interface";

@Controller("workspace")
@UseGuards(JwtAuthGuard)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  async getWorkspace(@Req() req: AuthenticatedRequest) {
    return this.workspaceService.getWorkspace(req.user.sub);
  }

  @Patch()
  async updateWorkspace(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.updateWorkspace(req.user.sub, dto);
  }
}
