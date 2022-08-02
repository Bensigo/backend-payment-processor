import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  createdAt: Date | string;

  @ApiProperty()
  updatedAt: Date | string;
}
