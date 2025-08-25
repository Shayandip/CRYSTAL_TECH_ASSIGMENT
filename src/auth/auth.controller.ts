import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserRole } from 'src/enum';
import { AdminSigninDto, OtpDto, SigninDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  signin(@Body() dto: AdminSigninDto) {
    return this.authService.signIn(dto.loginId, dto.password);
  }

  @Post('verify')
  verifyOtp(@Body() dto: OtpDto, @Req() req, @Ip() ip) {    
    return this.authService.verifyOtp(
      dto.loginId,
      dto.otp,
      req.headers.origin,
      ip,
    );
  }
}
