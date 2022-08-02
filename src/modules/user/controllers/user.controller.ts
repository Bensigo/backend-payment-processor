import {
  Body,
  Controller,
  Get,
  Injectable,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { userRouter, userRouterBase } from '@modules/user/user.router';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserResponseDTO,
  CreateUserDto,
} from '@modules/user/dtos/create-user.dto';
import { UserService } from '@modules/user/services/user.service';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { UserDto } from '@modules/user/dtos/user.dto';
import { UpdateUserRequestDto } from '@modules/user/dtos/update-user.dto';

@Injectable()
@Controller({ path: userRouterBase, version: userRouter.version })
@ApiTags('user')
@ApiHeader({ name: 'Authorization' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(userRouter.user.auth)
  @ApiOperation({
    operationId: 'V1AuthUserAction',
    description: 'Auth user with address',
    summary: '',
  })
  @ApiCreatedResponse({
    type: CreateUserResponseDTO,
    description: 'Auth user with address',
  })
  async authUserAction(
    @Body() body: CreateUserDto,
  ): Promise<CreateUserResponseDTO> {
    const { address } = body;
    return this.userService.createUser(address);
  }

  @UseGuards(JwtAuthGuard)
  @Get(userRouter.user.getUserByToken)
  @ApiOperation({
    operationId: 'V1GetUserByTokenAction',
    description: 'get user by token',
    summary: 'Get user by token',
  })
  @ApiCreatedResponse({
    type: UserDto,
    description: 'Auth user with address',
  })
  async getUserByToken(@Req() req: any): Promise<UserDto> {
    return this.userService.getUserByAddress(req.user.address);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(userRouter.user.updateUser)
  @ApiOperation({
    operationId: 'V1UpdateUserAction',
    description: 'Update user',
    summary: 'Update user',
  })
  @ApiCreatedResponse({
    type: UserDto,
    description: 'updated user',
  })
  async updateUserProfile(@Body() body: UpdateUserRequestDto, @Req() req: any) {
    return this.userService.updateUserProfile(body, req.user.id);
  }
}
