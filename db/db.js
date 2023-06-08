import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const connectdb = (URI) => {
  return mongoose.connect(URI);
};

export default connectdb;
