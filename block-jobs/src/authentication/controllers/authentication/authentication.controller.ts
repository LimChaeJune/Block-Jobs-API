import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/authentication/authentication.guard';
import { VerifyUserDto } from 'src/authentication/dtos/VerifyUser.dto';
import { AuthenticationService } from 'src/authentication/services/authentication/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() verfiyDto: VerifyUserDto): Promise<string> {
    return this.authService.ValidationUser(verfiyDto);
  }
}
