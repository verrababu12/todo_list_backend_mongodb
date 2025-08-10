const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    isChecked: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);

// const mongoose = require("mongoose");

// const todosSchema = new mongoose.Schema(
//   {
//     text: { type: String, required: true },
//     isChecked: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// const todo = mongoose.model("todos", todosSchema);

// module.exports = todo;
