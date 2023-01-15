import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ConfigService } from '@nestjs/config';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PermissionModule } from '@/common/permissions/permission.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
    TypeOrmModule.forFeature([ProductEntity]),
    PermissionModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
