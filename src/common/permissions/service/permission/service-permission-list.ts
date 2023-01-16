import { Type } from "@nestjs/common";

export enum ServicePermissions {
    PRODUCTSERVICE = '/product',
    CATEGORYSERVICE = '/category',
    USERSERVICE = '/user'
}


export const ServicePermissionList: ServicePermissions[] = [
    ServicePermissions.PRODUCTSERVICE,

    ServicePermissions.USERSERVICE
]