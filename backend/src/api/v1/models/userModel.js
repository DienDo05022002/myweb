const mongoose = require('mongoose');
// const Schema = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roleId: {
      type: String,
      default: "user",
    },
    // image: {
    //     type: String,
    //     dafault:
    //       "https://genvita.vn/resources/avatar/1157843c-1248-4960-b75e-df0031e903d6?width=119&height=119&mode=crop",
    //   },
    // isAdmin: { type: Boolean, required: true, default: false },
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('users', userSchema);