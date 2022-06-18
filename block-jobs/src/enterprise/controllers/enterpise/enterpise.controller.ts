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
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEnterPriseDto } from 'src/enterprise/dtos/CreateEnterprise.dto';
import { UpdateEnterPriseDto } from 'src/enterprise/dtos/UpdateEnterprise.dto';
import { EnterpriseService } from 'src/enterprise/services/enterpise/enterpise.service';
import { EnterpriseEntity } from 'src/typeorm/Enterprise.entity';

@Controller('enterprise')
@ApiTags('기업 API')
export class EnterpiseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  // @UseGuards(AuthGuard)
  @Get('byaccount/:address')
  async getEnterpriseByAccount(@Param('address') address: string) {
    return await this.enterpriseService.getEnterPriseByAccount(address);
  }

  @Get('byid/:enterpriseId')
  async getEnterpriseById(@Param('enterpriseId') enterpriseId: string) {
    return await this.enterpriseService.getEnterpriseById(enterpriseId);
  }

  @HttpCode(200)
  @Get('all')
  async getAllEnterprise(): Promise<EnterpriseEntity[]> {
    const enterPrise = await this.enterpriseService.getAllEnterprise();
    return enterPrise;
  }

  @HttpCode(200)
  @Post('register')
  @UsePipes(ValidationPipe)
  async createEnterprise(
    @Body() createDto: CreateEnterPriseDto,
  ): Promise<EnterpriseEntity> {
    try {
      const enterPrise = await this.enterpriseService.registerUser(createDto);
      return enterPrise;
    } catch (error) {
      throw new HttpException(
        `DB 저장 중 오류가 발생했습니다. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(200)
  @Put('update')
  @UsePipes(ValidationPipe)
  async updateEnterprise(@Body() updateDto: UpdateEnterPriseDto) {
    try {
      Logger.debug(updateDto);
      await this.enterpriseService.updateEnterprise(updateDto);
    } catch (error) {
      throw new HttpException(
        `DB 저장 중 오류가 발생했습니다. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
