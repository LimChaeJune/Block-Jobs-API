import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VerifyUserDto } from 'src/authentication/dtos/VerifyUser.dto';
import { AuthenticationService } from 'src/authentication/services/authentication/authentication.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  async register(@Body() createDto: CreateUserDto) {
    return this.authService.RegisterUser(createDto);
  }

  @HttpCode(200)
  @UseGuards()
  @Post('login')
  async login(@Body() accountDto: VerifyUserDto) {
    return this.authService.ValidationUser(accountDto);
  }
}
