import { Document } from 'mongoose';
import { Product } from './product';

export interface SubCategory extends Document {
    order: number,
    products: Product[],
    title: string,
    description: string
}

export interface Category extends Document {
    order: number,
    parentId: string,
    subcategories: any[],
    title: string,
    description: string
}