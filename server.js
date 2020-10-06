const express = require("express");
const moment = require("moment");
const uuid4 = require("uuid4");
const cors = require("cors");

let data = [];
const app = express();

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  setTimeout(() => {
    res.status(200).json({ data });
  }, 1000);
});
app.post("/todos", (req, res) => {
  const { text } = req.body;
  const newTodo = {
    id: uuid4(),
    createAt: moment(),
    isCompleted: false,
    text,
  };
  data.push(newTodo);
  res.status(201).json({ data: newTodo });
});
app.post("/todos/:id/completed", (req, res) => {
  const { id } = req.params;
  data = data.map((todo) => {
    if (todo.id === id) return { ...todo, isCompleted: true };
    return todo;
  });
  const completeTodo = data.find((todo) => todo.id === id);
  res.status(201).json({ data: completeTodo });
});
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const removeTodo = data.find((todo) => todo.id === id);
  data = data.filter((todo) => todo.id !== id);
  res.status(200).json({ data: removeTodo });
});

app.listen(8080, () => console.log("Server listening on port 8080"));
