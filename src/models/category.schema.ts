import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// @Schema()
// export class Category extends mongoose.Document {
//     @Prop({

//         type: mongoose.Schema.Types.ObjectId,
//     })
//     id: mongoose.Schema.Types.ObjectId;

//   @Prop({
//     type: mongoose.Schema.Types.Number,
//     default: 0
//   })
//   order: number;

//   @Prop()
//   parentId: string;

//   @Prop()
//   subcategories: [this];

//   @Prop({ required: true})
//   title: string

//   @Prop()
//   description: string
// }


// export const CategorySchema = SchemaFactory.createForClass(Category);


export const CategorySchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    parentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    // products: [{
    //     product: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'product'
    //     }
    // }],
    title: { type: String, required: true },
    description: { type: String },
});
// Duplicate the ID field.
CategorySchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 