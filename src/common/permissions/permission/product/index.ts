import { Type } from "@nestjs/common";
import { PermissionHandler } from "../permission-handler.interface";
import { CreateProductPermissionHandler } from "./create-product-permission.handler";
import { DeleteProductPermissionHandler } from "./delete-product-permission.handler";
import { EditProductPermissionHandler } from "./edit-product-permission.handler";
import { ReadProductPermissionHandler } from "./read-product-permission.handler";

export * from './create-product-permission.handler';
export * from './delete-product-permission.handler';
export * from './edit-product-permission.handler';
export * from './read-product-permission.handler';

export const productPermissions: Type<PermissionHandler>[] = [
    CreateProductPermissionHandler,
    DeleteProductPermissionHandler,
    EditProductPermissionHandler,
    ReadProductPermissionHandler
];