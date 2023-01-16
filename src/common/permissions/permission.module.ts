import { Module } from '@nestjs/common';
import { PermissionFactory } from './factory/permission.factory';
import { permissions } from './permission';
import { permissionProviders } from './providers';

@Module({
    imports: [],
    providers: [PermissionFactory, ...permissionProviders],
    exports: [PermissionFactory, ...permissions]
})
export class PermissionModule { }
