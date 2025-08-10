const Todo = require("../models/todoModel");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ error: "Error Fetching Todos" });
  }
};

// exports.getTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({ userId: req.user.id }).sort({
//       createdAt: -1,
//     });
//     res.json(todos);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error fetching todos" });
//   }
// };

exports.addTodo = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  try {
    const todo = await Todo.create({ text, userId: req.user.id });
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving todo" });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const updates = {};
  if (req.body.text !== undefined) updates.text = req.body.text;
  if (req.body.isChecked !== undefined) updates.isChecked = req.body.isChecked;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updates,
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting todo" });
  }
};
