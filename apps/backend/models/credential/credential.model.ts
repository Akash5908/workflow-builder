import mongoose, { Schema, Types } from "mongoose";

export enum CredsType {
  "SMTP",
  "TELEGRAM",
}

const CredentialSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(CredsType),
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    credsInfo: {
      type: Schema.Types.Mixed,
      default: {},
      validate: {
        validator: function (v: any) {
          if (this.type === "SMTP") {
            return v.host & v.port & v.user & v.pass;
          }
          if (this.type === "TELEGRAM") {
            return v.token & v.chatId;
          }
        },
      },
    },
    encrypted: { type: Boolean },
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

export const CredentialModel = mongoose.model("Credential", CredentialSchema);
