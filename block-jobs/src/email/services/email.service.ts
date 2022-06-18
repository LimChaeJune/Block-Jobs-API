import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: config.get<string>('service'),
      auth: {
        user: config.get<string>('email.user'),
        pass: config.get<string>('email.password'),
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = 'http://localhost:5001'; // TODO: config

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: 'BlockJobs 가입 인증 메일',
      html: `
          가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
          <form action="${url}" method="POST">
            <button>가입확인</button>
          </form>
        `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
