const mongoose = require('mongoose');
// const Schema = mongoose.Schema

const mainSchema = new mongoose.Schema(
  {
    name: { type: String},
    image: { type: String},
    // image: {
    //     type: String,
    //     dafault:
    //       "https://genvita.vn/resources/avatar/1157843c-1248-4960-b75e-df0031e903d6?width=119&height=119&mode=crop",
    //   },
  },
);
module.exports = mongoose.model('databases', mainSchema);