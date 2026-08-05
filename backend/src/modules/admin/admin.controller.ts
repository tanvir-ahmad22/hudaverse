import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AdminService } from "./admin.service";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";

import { RequirePermissions } from "../auth/decorators/permissions.decorator";

import { UpdateUserRoleDto } from "./dto/update-user-role.dto";
import { UpdateUserStatusDto } from "./dto/update-user-status.dto";

@Controller("admin")
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePermissions("admin.access")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  getUsers() {
    return this.adminService.getUsers();
  }

  @Get("users/:id")
  getUser(@Param("id") id: string) {
    return this.adminService.getUserById(id);
  }

  @Patch("users/:id/role")
  updateRole(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: UpdateUserRoleDto,
  ) {
    return this.adminService.updateUserRole(req.user.sub, id, dto.role);
  }
  @Patch("users/:id/status")
  updateStatus(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: UpdateUserStatusDto,
  ) {
    return this.adminService.updateUserStatus(req.user.sub, id, dto.isActive);
  }
}
