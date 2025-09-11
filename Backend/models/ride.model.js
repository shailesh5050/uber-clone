import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['ongoing', 'pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending',
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Captain',
  },
  fare: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  otp: {
    type: Number,
  },
});

rideSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Ride = mongoose.model('Ride', rideSchema);

export default Ride;
