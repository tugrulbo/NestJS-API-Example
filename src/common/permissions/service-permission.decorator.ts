import { User } from "@/api/user/user.entity";
import { SetMetadata, Type } from "@nestjs/common";
import { Subject } from "rxjs";
import { DefaultActions, Subjects } from "./factory/permission.factory";
import { PermissionHandler } from "./permission/permission-handler.interface";
import { ServicePermissions } from "./service/permission/service-permission-list";


export const CHECK_SERVICE_PERMISSION = 'check_service_permission';

export const ServicePermissionGuard = (...requirements: ServicePermissions[]) => SetMetadata(CHECK_SERVICE_PERMISSION, requirements);