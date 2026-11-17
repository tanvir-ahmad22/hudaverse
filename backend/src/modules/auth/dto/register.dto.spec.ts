import { validate } from "class-validator";
import { RegisterDto } from "./register.dto";

const validDto = (overrides: Partial<RegisterDto> = {}) => Object.assign(new RegisterDto(), {
  fullName: "Amina Yusuf",
  email: "Amina@example.com",
  password: "a-private-passphrase",
  confirmPassword: "a-private-passphrase",
  dateOfBirth: "1995-08-16",
  country: "BD",
  interests: ["QURAN", "HADITH"],
  termsAccepted: true,
  locale: "en",
  ...overrides,
});

describe("RegisterDto", () => {
  it("accepts a valid localized signup payload", async () => {
    expect(await validate(validDto())).toHaveLength(0);
  });

  it.each([
    ["weak password", { password: "password1234", confirmPassword: "password1234" }],
    ["mismatched passwords", { confirmPassword: "different-password" }],
    ["terms not accepted", { termsAccepted: false }],
    ["invalid country", { country: "ZZ" }],
    ["birth date before 1900", { dateOfBirth: "1899-12-31" }],
    ["future birth date", { dateOfBirth: "2999-01-01" }],
    ["unknown interest", { interests: ["AI"] }],
  ])("rejects %s", async (_name, overrides) => {
    expect(await validate(validDto(overrides as Partial<RegisterDto>))).not.toHaveLength(0);
  });
});
