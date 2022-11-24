const mongoose = require('mongoose');
// const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: {type: String},
    price: { type: Number, required: true },
    discount: { type:Number},
    countIn: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    description: { type: String, required: true },
    active: { type: String, default: 'on' },
    rollTop: { type: String, default: 'un' },
    // reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('products', productSchema);