if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data3.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("connected to DB");
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });
const dbUrl = process.env.ATLASDB_URL;

console.log(dbUrl);

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "668a8d077f63f4e62455950a",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
