import {
  ArrayUnique,
  Equals,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import * as countries from "i18n-iso-countries";

export enum SignupInterest {
  QURAN = "QURAN",
  HADITH = "HADITH",
  FIQH = "FIQH",
  TAFSIR = "TAFSIR",
  ISLAMIC_HISTORY = "ISLAMIC_HISTORY",
  OTHERS = "OTHERS",
}

const COUNTRY_CODES = Object.keys(countries.getAlpha2Codes());
const LOCALES = ["en", "bn", "ar", "ur", "fa", "tr"];
const COMMON_PASSWORDS = new Set([
  "password1234", "password12345", "qwerty12345", "1234567890",
  "iloveyou123", "welcome1234", "letmein1234", "admin123456",
]);

@ValidatorConstraint({ name: "notCommonPassword", async: false })
class NotCommonPassword implements ValidatorConstraintInterface {
  validate(value: string) {
    return typeof value === "string" && !COMMON_PASSWORDS.has(value.toLowerCase());
  }
  defaultMessage() { return "Choose a password that is not commonly used."; }
}

@ValidatorConstraint({ name: "matchingPassword", async: false })
class MatchingPassword implements ValidatorConstraintInterface {
  validate(value: string, args?: ValidationArguments) {
    return value === (args?.object as RegisterDto | undefined)?.password;
  }
  defaultMessage() { return "Passwords do not match."; }
}

@ValidatorConstraint({ name: "validBirthDate", async: false })
class ValidBirthDate implements ValidatorConstraintInterface {
  validate(value: string | undefined) {
    if (value === undefined) return true;
    const date = new Date(value);
    return !Number.isNaN(date.getTime()) && date.getUTCFullYear() >= 1900 && date.getTime() < Date.now();
  }
  defaultMessage() { return "Date of birth must be a past date after 1900."; }
}

export class RegisterDto {
  @IsString()
  @Length(2, 100)
  @Matches(/^[\p{L}\p{M}][\p{L}\p{M}\p{Zs}'.’\-]{0,99}$/u)
  fullName!: string;

  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(128)
  @Validate(NotCommonPassword)
  password!: string;

  @IsString()
  @Validate(MatchingPassword)
  confirmPassword!: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  @Validate(ValidBirthDate)
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  @IsIn(COUNTRY_CODES)
  country?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsEnum(SignupInterest, { each: true })
  interests?: SignupInterest[];

  @IsBoolean()
  @Equals(true)
  termsAccepted!: boolean;

  @IsIn(LOCALES)
  locale!: (typeof LOCALES)[number];

  // Kept only for compatibility with pre-existing register clients.
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_.-]{3,32}$/)
  username?: string;

}
