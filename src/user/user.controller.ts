import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './aplication/dtos/create.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  public getAll() {
    return this.userService.getAll();
  }
  @Post()
  @UsePipes(new ValidationPipe())
  public create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
