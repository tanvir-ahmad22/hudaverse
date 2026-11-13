import { Controller, Get, Patch, Body, Req, UseGuards } from "@nestjs/common";

import { SettingsService } from "./settings.service";
import { UpdateSettingsDto } from "./dto/update-settings.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AuthenticatedRequest } from "../auth/interfaces/authenticated-request.interface";

@Controller("settings")
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(@Req() req: AuthenticatedRequest) {
    return this.settingsService.getSettings(req.user.sub);
  }

  @Patch()
  async updateSettings(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateSettingsDto,
  ) {
    return this.settingsService.updateSettings(req.user.sub, dto);
  }
}
