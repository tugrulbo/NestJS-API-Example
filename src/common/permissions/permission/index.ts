import { Type } from "@nestjs/common";
import { PermissionHandler } from "./permission-handler.interface";
import { categoryPermissions } from "./category";
import { productPermissions } from "./product";
import { userPermissions } from "./users";


export * from './product';
export * from './category';
export * from './users';

export const permissions: Type<PermissionHandler>[] = [
    ...productPermissions,
    ...categoryPermissions,
    ...userPermissions
]