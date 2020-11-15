import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as Joiful from 'joiful';

class Subcategory {
    products: any[];
    order: string;
    title: string;
    description: string;
}

export class CategoryDto {
    @ApiPropertyOptional()
    @Joiful.string().optional()
    order: string;

    @ApiPropertyOptional()
    @Joiful.string().optional()
    parentId: string;

    @ApiProperty()
    @Joiful.string().required()
    title: string;

    @ApiPropertyOptional()
    @Joiful.string().optional()
    description: string;
}

export class CreateCategoryDto extends CategoryDto {}