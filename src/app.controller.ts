import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles/roles.decorator';
import { LoggingInterceptor } from './auth/interceptors/logging.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
// @Roles('admin')
  getHello(): string {
    return this.appService.getHello();
  }
}
