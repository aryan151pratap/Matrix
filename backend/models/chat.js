const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    developerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sender: { type: String, enum: ["user", "bot"], required: true },
    message: { type: String, required: true, trim: true },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
