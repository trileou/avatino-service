import { Document } from 'mongoose';

export interface File extends Document {
    originalname: string,
    filename: string,
    size: Number
}