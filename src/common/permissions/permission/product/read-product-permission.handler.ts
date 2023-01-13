import { ProductEntity } from "@/api/product/product.entity";
import { AppAbility, DefaultActions } from "../../factory/permission.factory";
import { PermissionHandler } from "../permission-handler.interface";


export class ReadProductPermissionHandler implements PermissionHandler {
    handle(ability: AppAbility): boolean {
        return ability.can(DefaultActions.read, ProductEntity);
    }

}