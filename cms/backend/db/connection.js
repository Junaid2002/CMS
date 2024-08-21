import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect();
    console.log('Database connected');
  } catch (error) {
    console.log('Error connecting to database', error);
  }
};