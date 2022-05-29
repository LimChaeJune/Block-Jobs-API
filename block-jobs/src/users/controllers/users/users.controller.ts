import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Inject,
  Headers,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from 'src/authentication/authentication.guard';
import { AuthenticationService } from 'src/authentication/services/authentication/authentication.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private authService: AuthenticationService,
  ) {}

  // @UseGuards(AuthGuard)
  @Get(':address')
  getUser(@Param('address') address: string) {
    return this.userService.getUserByAccount(address);
  }

  @HttpCode(200)
  @Post('register')
  @UsePipes(ValidationPipe)
  createUser(@Body() createDto: CreateUserDto) {
    console.log(createDto);
    this.userService.registerUser(createDto);
  }
}
