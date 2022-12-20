const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema(
  {
    categories: { type: String, required: true, unique: true },
    description: { type: String},
    // productId: {
    //     type: Schema.Types.ObjectId,
    //     refPath: 'products',
    //   },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", category);