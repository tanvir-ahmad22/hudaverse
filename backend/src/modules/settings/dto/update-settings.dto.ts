import { IsOptional, IsString, IsBoolean } from "class-validator";

export class UpdateSettingsDto {
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsBoolean()
  prayerReminder?: boolean;

  @IsOptional()
  @IsBoolean()
  notificationEnabled?: boolean;

  @IsOptional()
  @IsString()
  quranTranslation?: string;

  @IsOptional()
  @IsString()
  quranFontSize?: string;
}
