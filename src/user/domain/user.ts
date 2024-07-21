import { IsUUID } from 'class-validator';
import { UserPlainObject } from './user.plain-Object';

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly phonenumber: number,
  ) {}
  public toPlainObjct(): UserPlainObject {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      phonenumber: this.phonenumber,
    };
  }
}
