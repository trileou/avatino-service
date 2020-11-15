import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/auth.dto';
import { Category } from 'src/types';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('subcategories');
  }

  async create(categoryDto: any): Promise<Category> {
    const category = await this.categoryModel.create(categoryDto);
    await category.save();
    await this.updateSubCategory(categoryDto, category._id);
    return category.populate({
      path: 'subcategories',
      populate: { path: 'subcategories' },
    });
  }

  async updateSubCategory(categoryDto: any, cateId: string) {
    await this.categoryModel.update(
      { _id: categoryDto.parentId },
      { $addToSet: { subcategories: [cateId] } },
    );

    return true;
  }
}
