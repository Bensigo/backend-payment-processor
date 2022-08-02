import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from '@modules/wallet/services/wallet.service';
import { addWalletBodyDto } from '@modules/wallet/dtos/wallet.dto';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';

@Injectable()
@Controller({ path: 'wallet' })
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/')
  addWallet(@Body() body: addWalletBodyDto, @Req() req: any): Promise<any> {
    const { user } = req;
    const { address, network, explorerUrl } = body;
    return this.walletService.addWallet(address, network, user.id, explorerUrl);
  }

  @Get('/')
  getWallets(@Req() req: any) {
    const { user } = req;
    return this.walletService.listWallet(user.id);
  }

  @Delete('/:id')
  deleteWallet(@Param() param: any) {
    const { id } = param;
    return this.walletService.deleteAddress(id);
  }
}
