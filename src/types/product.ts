import { Document } from 'mongoose';

export interface Product extends Document {
    order: number,
    code: string,
    title: string,
    description: string,
    image: File[],
    price: number,
    color: string[],

}