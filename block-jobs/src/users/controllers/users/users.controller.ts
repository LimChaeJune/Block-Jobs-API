import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Body,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @Get()
  getTest() {
    return 'hello';
  }
  // @Get(':id')
  // getUsers(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
  //   const user = this.userService.findUserByAccount(id);
  //   if (user) {
  //     res.send(user);
  //   } else {
  //     res.status(400).send({ msg: '해당 지갑의 유저를 찾을 수 없습니다.' });
  //   }
  // }

  // @Get('/search/:id')
  // searchCustomerById(@Param('id') id: string) {
  //   const customer = this.userService.findUserByAccount(id);
  //   if (customer) return customer;
  //   else
  //     throw new HttpException(
  //       '해당 지갑의 유저를 찾을 수 없습니다',
  //       HttpStatus.BAD_REQUEST,
  //     );
  // }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createDto: CreateUserDto) {
    this.userService.registerUser(createDto);
  }
}
