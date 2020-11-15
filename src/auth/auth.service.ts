import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signPayload(payload: any) {
        return this.jwtService.sign(payload, { expiresIn: '86400' },)
    }

    async validateUser(payload: any) {
        return await this.userService.findByPayload(payload);
    }
}
