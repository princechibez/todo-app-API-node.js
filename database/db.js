const mongoose = require("mongoose");

const connectDB = (cb) => {
  mongoose
    .connect(
      "mongodb+srv://princeDB:38615271@practicedb.fbwbxjq.mongodb.net/tasksDB?retryWrites=true&w=majority"
    )
    .then((response) => {
      cb();
    })
    .catch((err) => console.log(err));
};

module.exports = connectDB;

//Repo name -------->>>>> todo-app-API-node.js