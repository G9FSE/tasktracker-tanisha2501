const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];
let idCounter = 1;


app.post("/tasks", (req, res) => {
  const { title } = req.body;

  const task = {
    id: idCounter++,
    title,
    status: "pending"
  };

  tasks.push(task);
  res.json(task);
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title;
  res.json(task);
});

app.patch("/tasks/:id/status", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = req.body.status;
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Task deleted" });
});

app.get("/tasks/done", (req, res) => {
  res.json(tasks.filter(t => t.status === "done"));
});

app.get("/tasks/not-done", (req, res) => {
  res.json(tasks.filter(t => t.status !== "done"));
});

app.get("/tasks/in-progress", (req, res) => {
  res.json(tasks.filter(t => t.status === "in-progress"));
});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
