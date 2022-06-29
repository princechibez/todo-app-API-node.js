const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");

const connectDB = require("./database/db");
const todoRoutes = require("./routes/routes");

const app = express();

app.use(bodyParser.json()); //Used for requests in json format
app.use(bodyParser.urlencoded({ extended: false })); //Used for requests in xx-ww-urlencoded <form>
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))
app.use(cors()); //This allows us to respond to request from other frontend frameworks aside the template engines

//Using the todoRoutes in the application
app.use("/todo/tasks", todoRoutes);

connectDB(() => {
  app.listen(5500, () => console.log("Running"));
});
