import express from "express";
import { WorkflowModel } from "../../models";
import { verifyToken } from "../../middleware/verify-token";
import {
  CredentialModel,
  CredsType,
} from "../../models/credential/credential.model";
import { executeEmail, executeTelegram } from "../../lib/executions";

const router: express.Router = express.Router();

interface Node {
  type: string;
}

router.post("/:workflowId", verifyToken, async (req, res) => {
  const { workflowId } = req.params;
  try {
    const workflow = await WorkflowModel.findById(workflowId);

    const telegramCred = await CredentialModel.findOne({
      userId: req.user?.userId!,
      type: CredsType.TELEGRAM,
    });
    if (!telegramCred) {
      return res.status(403).json({
        success: false,
        error: "Telegram cred not found. Create one first.",
      });
    }

    const emailCred = await CredentialModel.findOne({
      userId: req.user?.userId!,
      type: CredsType.SMTP,
    });
    if (!emailCred) {
      return res.status(403).json({
        success: false,
        error: "Email cred not found. Create one first.",
      });
    }

    workflow?.nodes.map(async (node) => {
      if (node.type === "Telegram") {
        const telegramData = {
          token: telegramCred.botToken!,
          message: node.data.metadata.message,
          chatID: node.data.metadata.chatID,
        };
        await executeTelegram(telegramData);
      } else if (node.type === "Email") {
        const data = node.data.metadata;
        const emailData = {
          email: data?.email!,
          message: data?.message!,
          subject: data?.subject!,
          host: emailCred?.host!,
          pass: emailCred?.pass!,
          user: emailCred?.user!,
        };

        await executeEmail(emailData);
      }
    });

    return res.status(200).json({
      success: true,
      message: "Workflow executed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to execute workflow.",
    });
  }
});

export { router as WebhookRouter };
