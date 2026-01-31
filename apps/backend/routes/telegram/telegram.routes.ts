import express from "express";
import { verifyToken } from "../../middleware/verify-token";
import { emailValidator } from "../../validator";
import {
  CredentialModel,
  CredsType,
} from "../../models/credential/credential.model";
import { telegramValidator } from "../../validator/telegram/telegram.validator";
import axios from "axios";
import { Telegraf } from "telegraf";
import { sendTelegramMessage } from "../../lib/telegram";

const router: express.Router = express.Router();

router.post("/send-message", verifyToken, async (req, res) => {
  const { success, data } = telegramValidator.safeParse(req.body);

  if (!success) {
    return res.status(403).json({
      success: false,
      error: "Invalid schema",
    });
  }
  const cred = await CredentialModel.findOne({
    userId: req.user?.userId!,
    type: CredsType.TELEGRAM,
  });
  if (!cred) {
    return res.status(403).json({
      success: false,
      error: "Create Telegram credential first.",
    });
  }
  try {
    const result = await sendTelegramMessage(
      cred.botToken!,
      data.chatID,
      data.message,
    );

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
});

export { router as TelegramRouter };
