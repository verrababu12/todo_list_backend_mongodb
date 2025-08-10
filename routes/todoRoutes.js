const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", auth, getTodos);
router.post("/add-todo", auth, addTodo);
router.put("/:id", auth, updateTodo);
router.delete("/:id", auth, deleteTodo);

module.exports = router;
