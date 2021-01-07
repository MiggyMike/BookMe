const { Schema } = require('mongoose');

module.exports = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bookedService: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        service_id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Services',
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
      phone: { type: Number },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
