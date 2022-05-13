import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/authentication/authentication.guard';
import { CreateEnterPriseDto } from 'src/enterprise/dtos/CreateEnterprise.dto';
import { EnterpriseService } from 'src/enterprise/services/enterpise/enterpise.service';

@Controller('enterpise')
export class EnterpiseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @UseGuards(AuthGuard)
  @Get(':address')
  getUser(@Param('address') address: string) {
    return this.enterpriseService.getEnterPriseByAccount(address);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  createUser(@Body() createDto: CreateEnterPriseDto) {
    this.enterpriseService.registerUser(createDto);
  }
}
