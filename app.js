require("dotenv").config();
const connectdb = require("./db/db");
const start = async () => {
  try {
    await connectdb(process.env.MONGODB_URI).then(() => {
      console.log("connected to database...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
