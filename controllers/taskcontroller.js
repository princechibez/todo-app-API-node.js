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
      Tasks.find()
        .select("title description timestamp")
        .then((tasks) => {
          res.json({ feedBack: "Task deleted successfully", newData: tasks });
        });
    })
    .catch((err) => {
      res.json("There was a problem creating the task, try again later");
      console.log(err);
    });
};

exports.getAllTasks = (req, res, next) => {
  Tasks.find()
    .select("title description timestamp")
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
  const urlParams = req.params.taskIndex;
  let title = req.body.title;
  let description = req.body.description;
  let timestamp = req.body.timestamp;

  Tasks.findById(urlParams).then((task) => {
    // let updatedTask = Tasks.find().select("title description timestamp")
    task.title = title;
    task.description = description;
    task.timestamp = timestamp;
    task.save();
    Tasks.find()
      .select("title description timestamp")
      .then((newTasks) => {
        res.json({ feedBack: "Task updated successfully", newData: newTasks });
      })
      .catch((err) => console.log(err));
  });
};

exports.deleteTask = (req, res, next) => {
  let params = req.params.taskIndex;
  Tasks.findByIdAndRemove(params).then(() => {
    // let taskToDelete = tasks.find((task) => tasks.indexOf(task) === params);
    // Tasks.deleteOne(taskToDelete, (err) => console.log(err));
    Tasks.find().then((newTasks) => {
      if (newTasks.length > 0) {
        res.json({ feedBack: "Task deleted successfully", newData: newTasks });
      } else {
        res.json({
          feedBack: "Task deleted successfully",
          newData: "No tasks left",
        });
      }
    });
  });
};
