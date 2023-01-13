import { Provider } from "@nestjs/common";
import { CreateUserPermissionProvider } from "./create-user-permission.provider";
import { DeleteUserPermissionProvider } from "./delete-user-permission.provider";
import { EditUserPermissionProvider } from "./edit-user-permission.provider";
import { ReadUserPermissionProvider } from "./read-user-permission.provider";

export const userPermissionProvider: Provider[] = [
    CreateUserPermissionProvider,
    EditUserPermissionProvider,
    ReadUserPermissionProvider,
    DeleteUserPermissionProvider
]