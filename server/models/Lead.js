import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  summary: { type: String, required: true }, // AI ka chat summary
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);