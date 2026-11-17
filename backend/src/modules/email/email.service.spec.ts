import * as nodemailer from "nodemailer";
import { EmailService } from "./email.service";

jest.mock("nodemailer", () => ({ createTransport: jest.fn(() => ({ sendMail: jest.fn().mockResolvedValue({}) })) }));

describe("EmailService SMTP authentication", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    (nodemailer.createTransport as jest.Mock).mockImplementation(() => ({ sendMail: jest.fn().mockResolvedValue({}) }));
    process.env = { ...originalEnv, NODE_ENV: "test", SMTP_HOST: "smtp.example.test", SMTP_PORT: "587" };
    process.env.SMTP_USER = "  ";
    process.env.SMTP_PASS = "";
  });

  afterAll(() => { process.env = originalEnv; });

  it("omits auth when SMTP credentials are empty", () => {
    new EmailService();
    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.not.objectContaining({ auth: expect.anything() }));
  });

  it("includes auth only when both credentials are configured", () => {
    process.env.SMTP_USER = " smtp-user ";
    process.env.SMTP_PASS = " smtp-pass ";
    new EmailService();
    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.objectContaining({ auth: { user: "smtp-user", pass: "smtp-pass" } }));
  });
});
