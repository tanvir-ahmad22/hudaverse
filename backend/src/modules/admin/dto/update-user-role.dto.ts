import { IsIn } from "class-validator";
import { Role } from "@prisma/client";

export class UpdateUserRoleDto {
  @IsIn([Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER])
  role!: Role;
}
