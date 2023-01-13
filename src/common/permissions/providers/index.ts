import { Provider } from "@nestjs/common";
import { categoryPermissionProvider } from "./category";
import { productPermissionProvider } from "./product";
import { userPermissionProvider } from "./users";

export const permissionProviders: Provider[] = [
    ...userPermissionProvider,
    ...categoryPermissionProvider,
    ...productPermissionProvider
]