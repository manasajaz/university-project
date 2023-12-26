const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    passward: {
      type: Number,
    },
    fee: {
      type: Number,
    },
    price: {
      type: Number
    },
    // price: {
    //   type: {
    //     currency: String,
    //     amount: Number,
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("courses", CourseSchema);

module.exports = CourseModel;
