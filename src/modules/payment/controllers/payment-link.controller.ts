import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentLinkService } from '@modules/payment/services/payment-link.service';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { createPaymentDto } from '@modules/payment/dtos/create-payment.dto';
import { ListPaymentLinkDto } from '@modules/payment/dtos/list-payment-link.dto';

@Controller({ path: 'payment' })
@UseGuards(JwtAuthGuard)
@Injectable()
export class PaymentLinkController {
  constructor(private readonly paymentService: PaymentLinkService) {}

  @Post('/')
  async createPaymentLink(@Body() body: createPaymentDto, @Req() req: any) {
    return this.paymentService.createPaymentLink(body, req.user);
  }

  @Get('/')
  async listPaymentLinks(@Query() query: ListPaymentLinkDto, @Req() req: any) {
    return this.paymentService.listPaymentLink(req.user.id, query);
  }
}
