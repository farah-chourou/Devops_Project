const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to MongoDB M-booking db...`);
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB: ${error}`);
    });
};
module.exports = connectDB;
