import express from "express";
import mongoose from "mongoose";
import { AuthRouter, WorkflowRouter } from "./routes";

const app = express();
app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/", WorkflowRouter);

const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

async function startServer() {
  try {
    await mongoose.connect(DATABASE_URL!);
    console.log("Connected to mongoDB server...");
    app.listen(port, () => {
      console.log(`Server running on port ${port}....`);
    });
  } catch (error) {
    console.log("Failed to connect to the DB...");
    process.exit(1);
  }
}

startServer();
