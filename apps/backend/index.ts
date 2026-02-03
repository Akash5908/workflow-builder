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
const allowedOrigins = [
  // "http://localhost:5173",
  "https://workflow-builder-k0hc.onrender.com",
  "https://workflow-builder-frontend-hazel.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`Blocked CORS from: ${origin}`); // Log for debugging
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add OPTIONS explicitly
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.set("trust proxy", 1);
app.use("/auth", AuthRouter);
app.use("/", WorkflowRouter);
app.use("/", CredentialRouter);
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
