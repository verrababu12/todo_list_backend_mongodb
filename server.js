const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/todoModel");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connection successful!");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

app.listen(3001, () => {
  console.log(`Server Running at http://localhost:3001`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/add-todo", async (req, res) => {
  const { text } = req.body;
  const newTodo = new Todo({
    text,
    isChecked: false,
  });
  try {
    const saveTodo = await newTodo.save();
    res.json(saveTodo);
  } catch (error) {
    console.error("Error saving todo:", error.message);
    res.status(500).json({ error: "Error Saving Todo" });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { isChecked, text } = req.body;

  const updateFields = {};
  if (isChecked !== undefined) updateFields.isChecked = isChecked;
  if (text) updateFields.text = text;

  try {
    const todo = await Todo.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).send("Server error");
  }
});

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ error: "Error Fetching Todos" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({ error: "Error Deleting Todo" });
  }
});
