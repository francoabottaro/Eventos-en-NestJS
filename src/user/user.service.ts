import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './domain/user';
import { UserPlainObject } from './domain/user.plain-Object';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './aplication/dtos/create.user.dto';
import { EmailService } from 'src/email/email.service';
import { SMSService } from 'src/sms/sms.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './domain/user.create.event';

@Injectable()
export class UserService {
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SMSService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  private users: User[] = [];

  public getAll(): UserPlainObject[] {
    return this.users.map((users) => users.toPlainObjct());
  }

  public create(data: CreateUserDto) {
    this.handlerUserDoesNotExist(data);
    const { email, name, phonenumber } = data;
    const user = new User(uuid(), email, name, phonenumber);
    this.users.push(user);

    // Event emitter
    this.eventEmitter.emit('user.created', new UserCreatedEvent(user.id));
  }

  //? Verification User
  private handlerUserDoesNotExist(data: CreateUserDto): void {
    if (
      this.users.some(
        (user) =>
          user.email === data.email || user.phonenumber === data.phonenumber,
      )
    ) {
      throw new ConflictException('User alredy exists');
    }
  }

  // ! Envent
  @OnEvent('user.created')
  private handlerSendWelcomeEmail(payload: UserCreatedEvent): void {
    const user = this.getUserById(payload.userId);
    this.emailService.sendEmail(user.email, `Welcome`, `hola pa`);
  }
  @OnEvent('user.created')
  private handlerSendWelcomeSMS(payload: UserCreatedEvent): void {
    const user = this.getUserById(payload.userId);
    this.smsService.sendSMS(user.phonenumber, `hola`);
  }

  //? GetUserId
  private getUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
