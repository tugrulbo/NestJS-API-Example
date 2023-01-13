import { CategoryEntity } from "@/api/category/category.entity";
import { AppAbility, DefaultActions } from "../../factory/permission.factory";
import { PermissionHandler } from "../permission-handler.interface";


export class ReadCategoryPermissionHandler implements PermissionHandler {
    handle(ability: AppAbility): boolean {
        return ability.can(DefaultActions.read, CategoryEntity);
    }

}