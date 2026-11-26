/* global require */
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5001;
const tasks = [
  {
    id: 1,
    title: "Belajar React JS",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    title: "Membuat Portfolio",
    status: "Completed",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Belajar Backend",
    status: "Todo",
    priority: "High",
  },
];

app.get("/api/tasks", (req, res) => {
  console.log("GET TASKS BERHASIL DI PANGGIL");
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    ...req.body,
    status: "Todo",
    deadline: req.body.deadline,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task tidak ditemukan",
    });
  }
  const deletedTask = tasks.splice(taskIndex, 1);

  res.json({
    message: "Task berhasil dihapus",
    task: deletedTask[0],
  });
});

app.put("/api/tasks/:id", (req, res) => {
  console.log("PUT BERHASIL DI PANGGIL");
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  console.log("ID YANG DICARI:", id);
  console.log("TASK DITEMUKAN:", task);

  if (!task) {
    return res.status(404).json({
      message: "Task tidak ditemukan",
    });
  }

  task.status = req.body.status;

  res.json({
    message: "Status berhasil diperbarui",
    task: task,
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  console.log("setelah app.listen");
});
