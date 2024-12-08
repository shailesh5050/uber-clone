import mongoose from "mongoose";

async function dbConnection() {
  const DB_URL = process.env.DB_URL;

  if (!DB_URL) {
    console.log("DB_URL is not defined");
    return;
  }
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database", error.message);
  }
}
export default dbConnection;
