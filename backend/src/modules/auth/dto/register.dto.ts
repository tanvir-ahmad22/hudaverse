import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {

  @IsOptional()
  @IsString()
  name?: string;


  @IsEmail()
  email!: string;


  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_.-]{3,32}$/)
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  @Matches(/^\+[1-9]\d{7,14}$/)
  phone?: string;

}
