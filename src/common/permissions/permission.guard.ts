import { ForbiddenError } from '@casl/ability';

import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { RequiredRole, CHECK_PERMISSION } from './permission.decorator';
import { PermissionFactory } from './factory/permission.factory';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslPermissionFactory: PermissionFactory
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules = this.reflector.get<RequiredRole[]>(CHECK_PERMISSION, context.getHandler()) || [];


        const { user } = context.switchToHttp().getRequest();

        const ability = this.caslPermissionFactory.defineAbility(user);

        try {
            rules.forEach((rule) => ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject));

            return true;
        } catch (error) {

            if (error instanceof ForbiddenError) {
                throw new ForbiddenException(error.message);
            }
        }
    }
}
