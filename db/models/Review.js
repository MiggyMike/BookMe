const { Schema } = require('mongoose');

module.exports = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  },
  { timestamps: true }
);
