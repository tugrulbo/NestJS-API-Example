import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '@/api/guards/requestWithUser.interface'
import { UserType } from '../user/user.entity';

const RoleGuard = (role: UserType): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest<RequestWithUser>();
            const user = request.user;

            return user?.user_type.includes(role);
        }
    }

    return mixin(RoleGuardMixin);
}

export default RoleGuard;