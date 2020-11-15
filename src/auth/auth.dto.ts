import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as Joiful from 'joiful';

export class UserDto {
    @ApiProperty()
    @Joiful.string().required()
    username: string;
    
    @ApiProperty()
    @Joiful.string().required()
    password: string;
}

export class CreateUserDto extends UserDto {

    @ApiPropertyOptional()
    @Joiful.string().optional()
    name?: string;
}