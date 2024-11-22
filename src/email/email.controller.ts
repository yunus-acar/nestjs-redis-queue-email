import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';

@Controller('email')
export class EmailController {
  constructor(private readonly queueService: QueueService) {}

  @Post('send')
  async sendEmail(
    @Body() body: { email: string; subject: string; content: string },
  ) {
    const { email, subject, content } = body;

    await this.queueService.addEmailTask(email, subject, content);

    return {
      message: 'Email sent to queue',
      email,
    };
  }
}
