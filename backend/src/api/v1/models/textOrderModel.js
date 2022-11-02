const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textOrderSchema = new mongoose.Schema(
  {
    user: { type: String },
    userId: { 
      type: Schema.Types.ObjectId,
      refPath: 'users'
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model('textcommant', textOrderSchema);