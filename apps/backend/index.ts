import express from "express";
import mongoose from "mongoose";
import { AuthRouter, WorkflowRouter } from "./routes";
import config from "./config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/", WorkflowRouter);

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
