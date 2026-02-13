import mongoose from "mongoose";

const ApiLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  endpoint: String,
  method: { type: String, default: "GET" },
  ip: String,
  userAgent: String,
  status: { type: Number, default: 200 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ApiLog || mongoose.model("ApiLog", ApiLogSchema);
