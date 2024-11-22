import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('email_queue') private emailQueue: Queue) {}

  async addEmailTask(email: string, subject: string, content: string) {
    await this.emailQueue.add('send_email', { email, subject, content });
    console.log(`Email added to queue: ${email}`);
  }
}
