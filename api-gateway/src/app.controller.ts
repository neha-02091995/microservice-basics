import { Controller, Get, Post, Body, Inject, Delete, Param} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AppController {
   
  constructor(
    @Inject('SERVICE_A') private readonly serviceA: ClientProxy,
    @Inject('SERVICE_B') private readonly serviceB: ClientProxy,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('/service-a/users')
  async getUsersFromServiceA() {
    
    this.logger.info('info','API Gateway: Fetching users from Service A');
    try {
      const result = await this.serviceA.send('get_users', {}).toPromise();
      this.logger.info(`API Gateway: Successfully fetched ${result?.length || 0} users from Service A`);
      return result;
    } catch (error) {
      this.logger.error(`API Gateway: Error fetching users from Service A - ${error.message}`);
      throw error;
    }
  }


  @Post('/service-a/users')
  async createUserInServiceA(@Body() userData: { name: string; email: string; age?: number }) {
    this.logger.info(`API Gateway: Creating user in Service A - ${userData.name}`);
    try {
      const result = await this.serviceA.send('create_user', userData).toPromise();
      this.logger.info(`API Gateway: Successfully created user in Service A - ${userData.name}`);
      return result;
    } catch (error) {
      this.logger.error(`API Gateway: Error creating user in Service A - ${error.message}`);
      throw error;
    }
  }

  @Get('/service-b/products')
  async getAllProducts() {
    this.logger.info('API Gateway: Fetching all products from Service B');
    try {
      const result = await this.serviceB.send('get_all_products', {}).toPromise();
      this.logger.info(`API Gateway: Successfully fetched ${result?.length || 0} products from Service B`);
      return result;
    } catch (error) {
      this.logger.error(`API Gateway: Error fetching products from Service B - ${error.message}`);
      throw error;
    }
  }

    @Post('/service-b/products')
  async createProduct(@Body() productData: {
    name: string;
    price: number;
    category: string;
    inStock: boolean;
  }) {
    this.logger.info(`API Gateway: Creating product in Service B - ${productData.name}`);
    try {
      const result = await this.serviceB.send('create_product', productData).toPromise();
      this.logger.info(`API Gateway: Successfully created product in Service B - ${productData.name}`);
      return result;
    } catch (error) {
      this.logger.error(`API Gateway: Error creating product in Service B - ${error.message}`);
      throw error;
    }
  }

  @Delete('/service-b/products/:id')
  async deleteProduct(@Param('id') id: string) {
    this.logger.info(`API Gateway: Deleting product with ID ${id} from Service B`);
    try {
      const result = await this.serviceB.send('delete_product', { id: parseInt(id) }).toPromise();
      this.logger.info(`API Gateway: Successfully deleted product with ID ${id} from Service B`);
      return result;
    } catch (error) {
      this.logger.error(`API Gateway: Error deleting product ${id} from Service B - ${error.message}`);
      throw error;
    }
  }
}