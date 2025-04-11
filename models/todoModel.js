const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    isChecked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const todo = mongoose.model("todos", todosSchema);

module.exports = todo;
