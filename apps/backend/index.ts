import express from "express";
import mongoose from "mongoose";
import { AuthRouter, WorkflowRouter } from "./routes";
import config from "./config";
import cors from "cors";
import { CredentialRouter } from "./routes/credential/credential.routes";
import { MailRouter } from "./routes/mail/mail.routes";
import { verifyToken } from "./middleware/verify-token";
import { TelegramRouter } from "./routes/telegram/telegram.routes";
import { WebhookRouter } from "./routes/webhook/webhook.routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/", verifyToken, WorkflowRouter);
app.use("/", verifyToken, CredentialRouter);
app.use("/", MailRouter);
app.use("/telegram", TelegramRouter);
app.use("/webhook", WebhookRouter);

async function startServer() {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log("Connected to mongoDB server...");
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}....`);
    });
  } catch (error) {
    console.log("Failed to connect to the DB...");
    process.exit(1);
  }
}

startServer();
