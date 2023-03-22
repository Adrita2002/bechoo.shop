require("dotenv").config();
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://localhost:27017/bechoodb`, () => {
    console.log("Connected to Database");
  });
}
