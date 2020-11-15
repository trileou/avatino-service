import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    order: Number,
    code: String,
    title: String,
    description: String,
    image: [{
        url: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File'
        }
    }],
    price: Number,
    colors: [{
        code: String,
    }],
},
{
    timestamps: true
});