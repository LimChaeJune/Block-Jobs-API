import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/authentication/authentication.guard';
import { CreateEnterPriseDto } from 'src/enterprise/dtos/CreateEnterprise.dto';
import { EnterpriseService } from 'src/enterprise/services/enterpise/enterpise.service';
import { EnterpriseEntity } from 'src/typeorm/Enterprise.entity';

@Controller('enterprise')
export class EnterpiseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  // @UseGuards(AuthGuard)
  @Get('getById/:address')
  getEnterprise(@Param('address') address: string) {
    return this.enterpriseService.getEnterPriseByAccount(address);
  }

  @HttpCode(200)
  @Post('register')
  @UsePipes(ValidationPipe)
  createEnterprise(
    @Body() createDto: CreateEnterPriseDto,
  ): Promise<EnterpriseEntity> {
    try {
      const enterPrise = this.enterpriseService.registerUser(createDto);
      return enterPrise;
    } catch (error) {
      throw new HttpException(
        `DB 저장 중 오류가 발생했습니다. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(200)
  @Get('all')
  getAllEnterprise(): Promise<EnterpriseEntity[]> {
    const enterPrise = this.enterpriseService.getAllEnterprise();
    return enterPrise;
  }
}
