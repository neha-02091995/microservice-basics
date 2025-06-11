import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService, Product } from './app.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  @MessagePattern('get_all_products')
  getAllProducts(): Product[] {
    this.logger.info('Service B: Received request to get all products');
    return this.appService.getAllProducts();
  }

  @MessagePattern('get_product_by_id')
  getProductById(data: { id: number }): Product | null {
    this.logger.info(`Service B: Received request to get product by ID ${data.id}`);
    return this.appService.getProductById(data.id);
  }

  @MessagePattern('create_product')
  createProduct(productData: Omit<Product, 'id'>): Product {
    this.logger.info(`Service B: Received request to create product - ${productData.name}`);
    return this.appService.createProduct(productData);
  }

  @MessagePattern('delete_product')
  deleteProduct(data: { id: number }): { success: boolean; message: string } {
    this.logger.info(`Service B: Received request to delete product with ID ${data.id}`);
    const success = this.appService.deleteProduct(data.id);
    return {
      success,
      message: success ? 'Product deleted successfully' : 'Product not found'
    };
  }


}
