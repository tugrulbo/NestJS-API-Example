import { Provider } from "@nestjs/common";
import { CreateCategoryPermissionProvider } from "./create-category-permission.provider";
import { DeleteCategoryPermissionProvider } from "./delete-category-permission.provider";
import { EditCategoryPermissionProvider } from "./edit-category-permission.provider";
import { ReadCategoryPermissionProvider } from "./read-category-permission.provider";

export const categoryPermissionProvider: Provider[] = [
    CreateCategoryPermissionProvider,
    EditCategoryPermissionProvider,
    ReadCategoryPermissionProvider,
    DeleteCategoryPermissionProvider
]