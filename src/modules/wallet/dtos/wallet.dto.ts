import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class addWalletBodyDto {
  @ApiProperty({ required: true })
  @IsString()
  address: string;

  @ApiProperty({ required: true })
  @IsString()
  network: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  explorerUrl?: string;
}
