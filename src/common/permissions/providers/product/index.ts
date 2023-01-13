import { Provider } from "@nestjs/common";
import { CreateProductPermissionProvider } from "./create-product-permission.provider";
import { DeleteProductPermissionProvider } from "./delete-product-permission.provider";
import { EditProductPermissionProvider } from "./edit-product-permission.provide";
import { ReadProductPermissionProvider } from "./read-product-permission.provider";

export const productPermissionProvider: Provider[] = [
    CreateProductPermissionProvider,
    ReadProductPermissionProvider,
    EditProductPermissionProvider,
    DeleteProductPermissionProvider
]