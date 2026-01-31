import mongoose, { Schema, Types } from "mongoose";
import { boolean } from "zod";

const nodeSchema = new Schema(
  {
    id: { type: String },
    workflowId: { type: String },
    position: {
      x: Number,
      y: Number,
    },
    data: { type: Schema.Types.Mixed, default: {} },
    type: String,
  },
  { _id: false },
);

const edgeSchema = new Schema(
  {
    id: {
      type: String,
    },
    style: { type: Schema.Types.Mixed, default: {} },
    markerEnd: { type: Schema.Types.Mixed, default: {} },
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
    unique: false,
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
  executed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const WorkflowModel = mongoose.model("Workflow", workflowSchema);
