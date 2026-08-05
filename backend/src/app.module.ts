import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { WorkspaceModule } from "./modules/workspace/workspace.module";
import { AdminModule } from "./modules/admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,

    ProfileModule,

    SettingsModule,

    WorkspaceModule,

    AdminModule,
  ],
})
export class AppModule {}
