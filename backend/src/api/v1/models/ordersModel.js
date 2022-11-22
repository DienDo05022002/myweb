const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new mongoose.Schema(
  {
    user: { type: String, required: true},

    customerOders: [
      {
        category: { type: String },
        name: { type: String },
        slug: { type: String },
        quantiny: { type: String },
        image: { type: String },
        price: { type: String },
        countIn: { type: String },
        description: { type: String },
        productId: {
          type: Schema.Types.ObjectId,
          refPath: 'products',
        },
      //   userId: { 
      //     type: Schema.Types.ObjectId,
      //     refPath: 'users'
      //   },
      },
    ],
    customerInformation: {
      fullName: { type: String },
      address: { type: String },
      phone: { type: String },
      note: { type: String },
    },
    totalOrders: { type: Number, required: true},
    methodPay: { type: String },
    userId: { 
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model('orders', ordersSchema);
