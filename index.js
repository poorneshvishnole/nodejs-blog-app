const express = require("express");
const app = express();
const dbConnect = require("./config/database");

require("dotenv").config();

dbConnect();

//middleware
app.use(express.json());

//routes
const blog = require("./routes/blog");

//mount on domain
app.use("/api/v1", blog);

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`App is started succesfully on port ${PORT}`);
});
