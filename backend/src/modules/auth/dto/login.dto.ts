import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {

  @IsOptional()
  @IsString()
  @MaxLength(255)
  identifier?: string;

  // Kept temporarily for existing API clients while the public contract migrates.
  @IsOptional()
  @IsString()
  @MaxLength(255)
  email?: string;


  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  password!: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;

}
