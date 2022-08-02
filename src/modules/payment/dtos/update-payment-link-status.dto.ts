import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class UpdatePaymentLinkStatusDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id: string;
}
