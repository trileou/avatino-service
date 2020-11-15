import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UserDto } from '../auth/auth.dto';
import { User } from '../types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor( 
        @InjectModel('User')
        private userModel:Model<User>
    ) {}

    private sanitilizeUser(user: User) {
        return user.depopulate("password");
    }

    async create(userDto: CreateUserDto) {
        const { username } = userDto;
        const user = await this.userModel.findOne({ username });
        if (user) {
            throw new BadRequestException('User already exists');
        }

        const createdUser = new this.userModel(userDto);
        await createdUser.save();
        return createdUser;
    };

    async findByLogin(userDto: UserDto) {
        const { username, password } = userDto;
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new UnauthorizedException('Invalid Username');
        }

        if( await bcrypt.compare(password, user.password)) {
            return user;
        } else {
            throw new UnauthorizedException('Invalid Password');
        }

    };
    
    async findByPayload(payload: any) {
        const { username } = payload;
        return this.userModel.findOne({ username });
    }
}
