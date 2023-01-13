import { createMongoAbility, InferSubjects, MongoAbility, PureAbility } from "@casl/ability";
import { Ability, AbilityClass } from "@casl/ability";
import { AbilityBuilder, ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User, UserType } from "@/api/user/user.entity";
import { ProductEntity } from "@/api/product/product.entity";
import { CategoryEntity } from "@/api/category/category.entity";


export enum DefaultActions {
    read = 'read',
    create = 'create',
    update = 'update',
    delete = 'delete',
    manage = 'manage',
}

export type Subjects = InferSubjects<typeof User | typeof ProductEntity | typeof CategoryEntity> | 'all';

export type AppAbility = MongoAbility<[DefaultActions, Subjects]>;

@Injectable()
export class PermissionFactory {
    defineAbility(user: User) {
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

        // { orgId: { $ne: user.orgId }
        switch (user.user_type) {
            case UserType.SUPERUSER:
                can(DefaultActions.manage, "all");
                break;
            case UserType.ADMIN:
                can(DefaultActions.read, User);
                can(DefaultActions.read, ProductEntity);
                can(DefaultActions.read, CategoryEntity);
                can(DefaultActions.create, User);
                can(DefaultActions.create, ProductEntity);
                can(DefaultActions.create, CategoryEntity);
                can(DefaultActions.update, User);
                can(DefaultActions.update, ProductEntity);
                can(DefaultActions.update, CategoryEntity);
                cannot(DefaultActions.delete, User, { id: { $not: { $eq: user.id } } }).because('You cannot delete user');
                cannot(DefaultActions.delete, ProductEntity).because('You cannot delete product');
                cannot(DefaultActions.delete, CategoryEntity).because('You cannot delete category');
                break;
            case UserType.USER:
                can(DefaultActions.read, User);
                can(DefaultActions.read, ProductEntity);
                can(DefaultActions.read, CategoryEntity);
                can(DefaultActions.update, User, { id: user.id }).because('You can update on yours');
                cannot(DefaultActions.delete, User, { id: { $not: { $eq: user.id } } }).because('You cannot delete user');
                cannot(DefaultActions.delete, ProductEntity).because('You cannot delete product');
                cannot(DefaultActions.delete, CategoryEntity).because('You cannot delete category');
                break;
            default:
                break;
        }


        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
        })

    }
}
