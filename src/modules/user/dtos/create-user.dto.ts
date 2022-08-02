import { ApiProperty } from '@nestjs/swagger';
import {IsEthereumAddress, IsString} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEthereumAddress()
  address: string;
}

export class CreateUserResponseDTO {
  @ApiProperty({ required: true })
  token: string;
}
