import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentType } from '@modules/payment/entities/payment-link.entity';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class createPaymentDto {
  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ enum: PaymentType })
  @IsEnum(PaymentType)
  paymentType: PaymentType;
}
