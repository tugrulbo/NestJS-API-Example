import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserType } from './user.entity';

@Injectable()
export class UserService {

    @InjectRepository(User)
    private readonly repository: Repository<User>;

    public all() {
        return this.repository.find({ relations: ['product'] });
    }

    public findUserProducts(id: string) {
        const data = this.repository.findOne({ where: { id: id }, relations: ['product'] });

        if (!data)
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

        return data;
    }

    public async changeUserType(@Body() request: any) {
        const { userId, userType } = request;
        let user = await this.repository.findOne({ where: { id: userId } });

        if (!user)
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

        if (userType == 'SuperUser') {
            user.user_type = UserType.SUPERUSER;
        }
        if (userType == 'User') {
            user.user_type = UserType.USER;
        }

        return this.repository.save(user);

    }

}
