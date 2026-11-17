import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly consoleAdapter: boolean;
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.consoleAdapter = process.env.NODE_ENV === "development" && !process.env.SMTP_HOST;
    if (process.env.NODE_ENV === "production" && !process.env.SMTP_HOST) {
      this.logger.error("SMTP_HOST is not configured; email delivery is unavailable.");
    }
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS?.trim();
    const auth = user && pass ? { user, pass } : undefined;
    this.transporter = this.consoleAdapter
      ? nodemailer.createTransport({ streamTransport: true, buffer: true })
      : nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === "true",
          ...(auth ? { auth } : {}),
        });
  }

  async sendMail(to: string, subject: string, html: string) {
    const result = await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
    if (this.consoleAdapter) {
      console.info("[development email adapter]", result.message.toString());
    }
  }
}
