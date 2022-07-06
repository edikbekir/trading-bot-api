import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserDto, token: string) {
    const url = `https://bitrade.tech/signin?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Bitrade" <thebitrader@gmail.com>',
      subject: 'Вітаємо на Bitrade! Підтвердіть свій email',
      template: './confirmation',
      context: {
        name: user.username,
        url,
      },
    });
  }
}
