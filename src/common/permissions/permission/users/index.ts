import { Type } from "@nestjs/common";
import { PermissionHandler } from "../permission-handler.interface";
import { CreateUserPermissionHandler } from "./create-user-permission.handler";
import { DeleteUserPermissionHandler } from "./delete-user-permission.handler";
import { EditUserPermissionHandler } from "./edit-user-permission.handler";
import { ReadUserPermissionHandler } from "./read-user-permission.handler";

export * from './create-user-permission.handler';
export * from './delete-user-permission.handler';
export * from './edit-user-permission.handler';
export * from './read-user-permission.handler';

export const userPermissions: Type<PermissionHandler>[] = [
    CreateUserPermissionHandler,
    EditUserPermissionHandler,
    ReadUserPermissionHandler,
    DeleteUserPermissionHandler
]
