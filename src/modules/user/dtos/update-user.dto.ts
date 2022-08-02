import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Min } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty({ required: true })
  @IsString()
  username: string;

  @ApiPropertyOptional({})
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({})
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({})
  @IsString()
  @IsOptional()
  industry?: string;
}
