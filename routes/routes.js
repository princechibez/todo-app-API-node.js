const express = require("express");

const routes = express.Router();

const taskControllers = require("../controllers/taskcontroller");

routes.post("/add", taskControllers.postAddTask);

routes.put("/update/:taskIndex", taskControllers.updateTask);

routes.delete("/delete/:taskIndex", taskControllers.deleteTask);

routes.get("/all", taskControllers.getAllTasks);

module.exports = routes;