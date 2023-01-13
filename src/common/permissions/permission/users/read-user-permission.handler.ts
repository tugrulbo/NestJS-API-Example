import { User } from "@/api/user/user.entity";
import { AppAbility, DefaultActions } from "../../factory/permission.factory";
import { PermissionHandler } from "../permission-handler.interface";


export class ReadUserPermissionHandler implements PermissionHandler {
    handle(ability: AppAbility): boolean {
        return ability.can(DefaultActions.read, User);
    }

}