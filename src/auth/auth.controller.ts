import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../shared/validation.pipe';
import { UserService } from '../shared/user.service';
import { CreateUserDto, UserDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    testAuth() {
        return { auth: 'work' }
    }

    @UsePipes(ValidationPipe)
    @Post('login') 
    async login(@Body() userDto: UserDto) {
        const user = await this.userService.findByLogin(userDto);
        const payload = {
            name: user.name,
            username: user.username
        }
        const token = await this.authService.signPayload(payload);
        return {
            token: token
        };
    }

    @UsePipes(ValidationPipe)
    @Post('register') 
    async register(@Body() userDto: CreateUserDto) {
        return await this.userService.create(userDto);
    }
}
