import { Type } from "@nestjs/common";
import { PermissionHandler } from "../permission-handler.interface";
import { CreateCategoryPermissionHandler } from "./create-category-permission.handler";
import { DeleteCategoryPermissionHandler } from "./delete-category-permission.handler";
import { EditCategoryPermissionHandler } from "./edit-category-permission.handler";
import { ReadCategoryPermissionHandler } from "./read-category-permission.handler";

export * from './create-category-permission.handler';
export * from './delete-category-permission.handler';
export * from './edit-category-permission.handler';
export * from './read-category-permission.handler';

export const categoryPermissions: Type<PermissionHandler>[] = [
    CreateCategoryPermissionHandler,
    EditCategoryPermissionHandler,
    ReadCategoryPermissionHandler,
    DeleteCategoryPermissionHandler
]

