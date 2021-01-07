const { Schema } = require('mongoose');

module.exports = new Schema(
  {
    service: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: false,
    },
    duration: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'reviews',
      },
    ],
  },
  { timestamps: true }
);
