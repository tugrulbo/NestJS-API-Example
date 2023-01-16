import { ForbiddenError } from '@casl/ability';

import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Type,
    Scope,
    mixin,
    Inject
} from '@nestjs/common';

import { ContextIdFactory, ModuleRef, Reflector } from '@nestjs/core';
import { RequiredRole, CHECK_PERMISSION } from './permission.decorator';
import { PermissionFactory } from './factory/permission.factory';
import { PermissionHandler } from './permission/permission-handler.interface';
import { ServicePermissionList, ServicePermissions } from './service/permission/service-permission-list';
import { CHECK_SERVICE_PERMISSION } from './service-permission.decorator';


@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(private reflector: Reflector, private caslPermissionFactory: PermissionFactory, private moduleRef: ModuleRef) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const path = this.reflector.get<ServicePermissions>(CHECK_SERVICE_PERMISSION, context.getClass()) || [];

        const found = ServicePermissionList.find(function (serviceName) {
            return serviceName === path[0]

        });
        console.log(found);

        if (found) {
            const rules = this.reflector.get<Type<PermissionHandler>[]>(CHECK_PERMISSION, context.getHandler()) || [];
            if (rules.length === 0) return true;
            const ctx = ContextIdFactory.create();

            let permissionHandlers: PermissionHandler[] = [];

            for (let i = 0; i < rules.length; i++) {
                const permissionHandlerRef = rules[i];
                const permissionScope = this.moduleRef.introspect(permissionHandlerRef).scope;
                let permissionHandler: PermissionHandler;

                if (permissionScope == Scope.DEFAULT)
                    permissionHandler = this.moduleRef.get(permissionHandlerRef, { strict: false });
                else
                    permissionHandler = await this.moduleRef.resolve(permissionHandlerRef, ctx, { strict: false });

                permissionHandlers.push(permissionHandler);
            }

            const { user } = context.switchToHttp().getRequest();

            const ability = this.caslPermissionFactory.defineAbility(user);

            return permissionHandlers.every((handler) => handler.handle(ability));

        }
        else {
            return true;
        }


    }
}

