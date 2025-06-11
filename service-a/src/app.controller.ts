import { Controller, Body, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppService } from './app.service';
import { Logger } from 'winston';

@Controller()
export class AppController {
   constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  @MessagePattern('get_users')
  async getUsers() {
    this.logger.info('Service A: Received request to get users');
    return await this.appService.getUsers();
  }

  @MessagePattern('create_user')
  async createUser(@Body() userData: { name: string; email: string; age?: number }) {
    this.logger.info(`Service A: Received request to create user - ${userData.name}`);
    return await this.appService.createUser(userData);
  }
}
