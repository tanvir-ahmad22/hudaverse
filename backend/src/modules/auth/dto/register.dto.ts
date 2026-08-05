import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {

  @IsOptional()
  @IsString()
  name?: string;


  @IsEmail()
  email!: string;


  @IsString()
  @MinLength(8)
  password!: string;

} 