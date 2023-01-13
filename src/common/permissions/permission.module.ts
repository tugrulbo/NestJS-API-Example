import { Module } from '@nestjs/common';
import { PermissionFactory } from './factory/permission.factory';

@Module({
    providers: [PermissionFactory],
    exports: [PermissionFactory]
})
export class PermissionModule { }
