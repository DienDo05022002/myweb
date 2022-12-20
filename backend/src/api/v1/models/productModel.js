const mongoose = require('mongoose');
const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    // userId: { 
    //   type: Schema.Types.ObjectId,
    //   ref: 'users'
    // },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String,  unique: true },
    slug: { type: String,  unique: true },
    category: { type: String,  },
    image: {type: String},
    price: { type: Number,  },
    discount: { type:Number},
    countIn: { type: Number,  },
    rating: { type: Number,  },
    numReviews: { type: Number,  },
    description: { type: String,  },
    active: { type: String, default: 'on' },
    rollTop: { type: String, default: 'un' },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('products', productSchema);