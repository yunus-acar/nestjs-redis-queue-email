import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from '../email/email.service';

@Processor('email_queue')
export class QueueProcessor {
  constructor(private readonly emailService: EmailService) {}

  @Process('send_email')
  async handleEmailTask(job: Job) {
    const { email, subject, content } = job.data;

    console.log(`Task received: ${email}, ${subject}`);
    try {
      await this.emailService.sendEmail(email, subject, content);
      console.log(`Email successfully sent: ${email}`);
    } catch (error) {
      console.error(`Email sending failed: ${email}`, error);
    }
  }
}
