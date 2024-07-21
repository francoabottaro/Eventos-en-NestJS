import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  public sendEmail(email: string, subject: string, message: string): void {
    console.log('Done Email');
  }
}
