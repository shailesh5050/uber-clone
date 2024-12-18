import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      minlength: [3, "mim length should be 3"],
      required: true,
    },
    lastname: {
      type: String,
      minlength: [3, "mim length should be 3"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "mim length should be 6"],
  },
  socketId: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    vehicleType: {
      type: String,
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

// Instance method to generate an authentication token

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

// Static method to hash a password
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Instance method to compare a password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const CaptainModel = mongoose.model("Captain", captainSchema);

export default CaptainModel;
