import express from "express";
import { verifyToken } from "../../middleware/verify-token";
import { credentialValidator } from "../../validator/credential/credential.validator";
import { CredentialModel } from "../../models/credential/credential.model";

const router: express.Router = express.Router();

router.post("/credential", async (req, res) => {
  const { name, type } = req.body.credential;
  const { success, data } = credentialValidator.safeParse({
    name,
    type,
  });
  if (!success) {
    return res.status(403).json({
      success: false,
      error: "Invalid Schema",
    });
  }
  const existingCred = await CredentialModel.findOne({
    userId: req.user?.userId!,
    name: data.name,
  });

  if (existingCred) {
    return res.status(403).json({
      success: false,
      error: `${data.name} cred already exist.`,
    });
  }
  try {
    const credential = await CredentialModel.create({
      ...req.body.credential,
      userId: req.user?.userId!,
    });
    return res.status(200).json({
      success: true,
      credential: credential,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// get all creds
router.get("/credential", async (req, res) => {
  try {
    const creds = await CredentialModel.find({ userId: req.user?.userId! });
    return res.status(200).json({
      success: true,
      credential: creds,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: "No creds found for the user.",
    });
  }
});

export { router as CredentialRouter };
