import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('category')
@ApiTags('category')
@ApiBearerAuth()
export class CategoryController {
    constructor(private categoryService: CategoryService) {}
    @Get()
    listAll() {
        return this.categoryService.findAll();
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
}
