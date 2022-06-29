const Tasks = require("../models/tasks");

exports.postAddTask = (req, res, next) => {
  let title = req.body.title;
  let description = req.body.description;
  let timestamp = req.body.timestamp;
  let task = new Tasks({
    title: title,
    description: description,
    timestamp: timestamp,
  });
  task
    .save()
    .then((result) => {
      res.json("Task was created Successfully.");
    })
    .catch((err) => {
      res.json("There was a problem creating the task, try again later");
      console.log(err);
    });
};

exports.getAllTasks = (req, res, next) => {
  Tasks.find()
    .then((tasks) => {
      if (tasks.length === 0) {
        res.json("You dont have any tasks.");
      } else {
        res.json(tasks);
      }
    })
    .catch((err) => console.log(err));
};

exports.updateTask = (req, res, next) => {
  const urlParams = +req.params.taskIndex;
  let title = req.body.title;
  let description = req.body.description;
  let timestamp = req.body.timestamp;

  Tasks.find().then((tasks) => {
    let taskToUpdate = tasks.find((task) => tasks.indexOf(task) === urlParams);
    taskToUpdate.title = title;
    taskToUpdate.description = description;
    taskToUpdate.timestamp = timestamp;
    taskToUpdate.save();
    res.json({ response: "Task updated successfully", newData: tasks });
  });
};

exports.deleteTask = (req, res, next) => {
  let params = req.params.taskIndex;
  Tasks.find().then((tasks) => {
    let taskToDelete = tasks.find((task) => tasks.indexOf(task) === params);
    Tasks.deleteOne(taskToDelete, (err) => console.log(err));
    res.json("Task deleted successfully");
  });
};
