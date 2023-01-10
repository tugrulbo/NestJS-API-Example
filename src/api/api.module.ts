import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './user/auth/auth.module';

@Module({
  imports: [AuthModule, ProductModule, CategoryModule]
})
export class ApiModule { }
