import express from "express";
import { verifyToken } from "../../middleware/verify-token";
import { emailValidator } from "../../validator/email/email.validator";
import { CredentialModel } from "../../models/credential/credential.model";
import nodemailer from "nodemailer";

const router: express.Router = express.Router();

router.post("/send-mail", verifyToken, async (req, res) => {
  const { success, data } = await emailValidator.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      success: false,
      error: "Invalid Schema",
    });
  }
  const cred = await CredentialModel.findOne({ userId: req.user?.userId! });
  if (cred === null) {
    return res.status(403).json({
      success: false,
      error: "Don't have email cred. Please create one.",
    });
  }
  try {
    const { host, port, user, pass } = cred;

    return res.status(200).json({
      success: true,
      message: "Successfully sent the mail.",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error,
    });
  }
});

export { router as MailRouter };
