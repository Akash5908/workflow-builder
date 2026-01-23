import express from "express";
import jwt from "jsonwebtoken";
import { workflowValidator } from "../../validator/workflow/workflow.validator";
import { WorkflowModel } from "../../models";
import { verifyToken } from "../../middleware/verify-token";

const router: express.Router = express.Router();

router.post("/workflow", verifyToken, async (req, res) => {
  const user = req.user!;
  const { success, data } = workflowValidator.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      success: false,
      error: "Invalid schema",
    });
  }
  try {
    console.log(data, user);
    const workflow = await WorkflowModel.create({
      userId: user.userId,
      workflowName: data.workflowName,
    });

    return res.status(200).json({
      success: true,
      workflowId: workflow._id,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: "Workflow name already present.",
    });
  }
});

router.put("/workflow/:id", verifyToken, async (req, res) => {
  const userId = req.user?.userId;
  const workflowId = req.params.id;
  try {
    const workflow = await WorkflowModel.findOneAndUpdate(
      {
        _id: workflowId,
        userId: userId as string,
      },
      { $set: req.body.workflow },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      workflow: workflow,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      error: "Workflow not found or you don't have access.",
    });
  }
});

router.get("/workflow", verifyToken, async (req, res) => {
  const userId = req.user?.userId;
  try {
    const workflow = await WorkflowModel.find({ userId: userId as string });
    return res.status(200).json({
      success: true,
      workflow: workflow,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: "No workflow present for this user.",
    });
  }
});

router.get("/workflow/:id", verifyToken, async (req, res) => {
  const userId = req.user?.userId;
  const workflowId = req.params.id;
  try {
    const workflow = await WorkflowModel.find({
      _id: workflowId,
      userId: userId as string,
    });
    return res.status(200).json({
      success: true,
      workflow: workflow,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      error: "No workflow found with this Id.",
    });
  }
});

export { router as WorkflowRouter };
