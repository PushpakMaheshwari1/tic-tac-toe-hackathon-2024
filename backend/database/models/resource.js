import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const borrowLendBookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true, 
    },
    bookName: {
      type: String,
      required: true,
      default: uuid, 
    },
    author: {
      type: String,
      required: true,
      default: uuid, 
    },
    category: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      unique: true,
      required: true, 
    },
    borrowDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } 
);

const bookSellSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true, 
    },
    bookName: {
      type: String,
      required: true,
      default: uuid, 
    },
    author: {
      type: String,
      required: true,
      default: uuid, 
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      unique: true,
      required: true, 
    },
    listingDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } 
);

const bookModel = mongoose.model("borrowLendBook", borrowLendBookSchema);
const bookSell = mongoose.model("bookSell",bookSellSchema);
export default bookModel;
