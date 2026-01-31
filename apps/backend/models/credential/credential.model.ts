import mongoose, { Schema, Types } from "mongoose";
import { required } from "zod/mini";

export enum CredsType {
  SMTP = "SMTP",
  TELEGRAM = "TELEGRAM",
}

const CredentialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(CredsType),
      required: true,
    },
    host: String,
    port: Number,
    user: String,
    pass: String,
    botToken: String,
    createdAt: {
      type: Date,
      default: new Date(),
      index: true,
    },
  },
  {
    collection: "credentials",
  },
);

CredentialSchema.pre("save", async function () {
  if (this.type === CredsType.SMTP) {
    if (!this.host || !this.port || !this.user || !this.pass) {
      throw new Error("SMTP requires user, port, host and pass");
    }
  } else if (this.type === CredsType.TELEGRAM) {
    if (!this.botToken) {
      throw new Error("Telegram required token and chatId");
    }
  }
});

export const CredentialModel = mongoose.model("Credential", CredentialSchema);
