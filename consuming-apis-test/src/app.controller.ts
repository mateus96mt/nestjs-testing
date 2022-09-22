import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getManyUrls(@Body() urls: Array<any>): string {
    console.log(urls);
    // return 'true';
    return this.appService.requestManyUrls(urls);
  }
}
