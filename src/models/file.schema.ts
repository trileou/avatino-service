import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema(
  {
    originalname: String,
    filename: String,
    size: Number
  },
  {
    timestamps: true,
  },
);
