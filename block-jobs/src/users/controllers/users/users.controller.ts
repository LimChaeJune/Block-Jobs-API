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
  Logger,
  HttpException,
  HttpStatus,
  BadRequestException,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from 'src/authentication/authentication.guard';
import { AuthenticationService } from 'src/authentication/services/authentication/authentication.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { UserResumeEntity } from 'src/typeorm/Resume.entity';
import { UserEntity } from 'src/typeorm/User.entity';
import { CreateCareerDto } from 'src/users/dtos/CreateCareer.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateCareerDto } from 'src/users/dtos/UpdateCareer.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private authService: AuthenticationService,
  ) {}

  // @UseGuards(AuthGuard)
  @Get(':address')
  async getUser(@Param('address') address: string) {
    Logger.debug(address);
    return await this.userService.getUserByAccount(address);
  }

  @Get('resume/:userId')
  async getUserResumes(@Param('userId') userId: string) {
    return await this.userService.getResumes(userId);
  }

  @HttpCode(200)
  @Get('careers/:userId')
  async getCareers(@Param('userId') userId: string) {
    return await this.userService.getCareers(userId);
  }

  @HttpCode(200)
  @UseFilters(HttpExceptionFilter)
  @Post('register')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createDto: CreateUserDto) {
    await this.userService.registerUser(createDto);
  }

  @HttpCode(200)
  @UseFilters(HttpExceptionFilter)
  @Post('update')
  async updateUser(@Body() updateDto: UserEntity) {
    await this.userService.updateUser(updateDto);
  }

  @HttpCode(200)
  @UseFilters(HttpExceptionFilter)
  @Post('resume/add')
  async addResume(@Body() createDto: UserResumeEntity) {
    await this.userService.addResume(createDto);
  }

  @HttpCode(200)
  @Post('career')
  @UsePipes(ValidationPipe)
  async createCareers(@Body() career: CreateCareerDto) {
    await this.userService.addCareers(career);
  }

  @HttpCode(200)
  @Post('career/update')
  async updateCareers(@Body() career: UpdateCareerDto) {
    Logger.debug(career);
    await this.userService.updateCareers(career);
  }
}
