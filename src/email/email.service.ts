import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private sender: string;
  constructor(private configService: ConfigService) {
    this.sender = this.configService.get<string>('EMAIL_USER');
    const emailService = this.configService.get<string>('EMAIL_SERVICE');
    const options: SMTPTransport.Options = {
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    };

    if (emailService) {
      options.service = emailService;
    } else {
      options.host = this.configService.get('EMAIL_HOST');
      options.port = this.configService.get('EMAIL_PORT');
      options.secure = this.configService.get('EMAIL_SECURE') === 'true';
    }
    this.transporter = nodemailer.createTransport(options);
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"ME" <${this.sender}>`,
        to,
        subject,
        text: content,
      });
      console.log(`Email successfully sent: ${to}`);
    } catch (error) {
      console.error(`Email sending failed: ${to}`, error);
      throw error;
    }
  }
}
