import mongoose, { Schema, Types } from "mongoose";

const nodeSchema = new Schema(
  {
    id: String,
    position: {
      x: Number,
      y: Number,
    },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: false },
);

const edgeSchema = new Schema(
  {
    id: String,
    source: String,
    target: String,
  },
  { _id: false },
);

const workflowSchema = new Schema({
  workflowName: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  nodes: {
    type: [nodeSchema],
    default: [],
  },
  edges: {
    type: [edgeSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const WorkflowModel = mongoose.model("Workflow", workflowSchema);
