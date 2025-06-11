import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 999.99,
      category: 'Electronics',
      inStock: true,
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 699.99,
      category: 'Electronics',
      inStock: true,
    },
    {
      id: 3,
      name: 'Coffee Mug',
      price: 12.99,
      category: 'Home',
      inStock: false,
    },
    {
      id: 4,
      name: 'Desk Chair',
      price: 249.99,
      category: 'Furniture',
      inStock: true,
    },
    {
      id: 5,
      name: 'Wireless Mouse',
      price: 29.99,
      category: 'Electronics',
      inStock: true,
    },
  ];

  private nextId = 6;

  getAllProducts(): Product[] {
    this.logger.info('Service B: Fetching all products');
    this.logger.info(`Service B: Returning ${this.products.length} products`);
    return this.products;
  }

  getProductById(id: number): Product | null {
    this.logger.info(`Service B: Fetching product with ID ${id}`);
    const product = this.products.find(product => product.id === id) || null;
    if (product) {
      this.logger.info(`Service B: Found product - ${product.name}`);
    } else {
      this.logger.warn(`Service B: Product with ID ${id} not found`);
    }
    return product;
  }

  createProduct(productData: Omit<Product, 'id'>): Product {
    this.logger.info(`Service B: Creating new product - ${productData.name}`);
    const newProduct: Product = {
      id: this.nextId++,
      ...productData,
    };
    this.products.push(newProduct);
    this.logger.info(
      `Service B: Successfully created product - ${newProduct.name} with ID ${newProduct.id}`,
    );
    return newProduct;
  }

  deleteProduct(id: number): boolean {
    this.logger.info(`Service B: Deleting product with ID ${id}`);
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      this.logger.warn(
        `Service B: Product with ID ${id} not found for deletion`,
      );
      return false;
    }
  }
}
