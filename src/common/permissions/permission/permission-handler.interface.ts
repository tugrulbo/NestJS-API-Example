import { AppAbility } from "../factory/permission.factory";

export interface PermissionHandler {
    handle(ability: AppAbility): boolean;
}