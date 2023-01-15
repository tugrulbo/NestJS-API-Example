import { Type } from "@nestjs/common";

export enum ServicePermissions {
    PRODUCTSERVICE = 'product_service',
    CATEGORYSERVICE = 'category_service',
    USERSERVICE = 'user_service'
}


export const ServicePermissionList: ServicePermissions[] = [
    ServicePermissions.PRODUCTSERVICE,

    ServicePermissions.USERSERVICE
]