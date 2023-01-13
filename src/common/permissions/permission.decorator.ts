import { User } from "@/api/user/user.entity";
import { SetMetadata, Type } from "@nestjs/common";
import { Subject } from "rxjs";
import { DefaultActions, Subjects } from "./factory/permission.factory";
import { PermissionHandler } from "./permission/permission-handler.interface";

export interface RequiredRole {
    action: DefaultActions;
    subject: Subjects;
}

export const CHECK_PERMISSION = 'check_permission';

export const Permission = (...requirements: Type<PermissionHandler>[]) => SetMetadata(CHECK_PERMISSION, requirements);