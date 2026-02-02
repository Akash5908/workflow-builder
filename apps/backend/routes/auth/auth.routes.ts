import express from "express";
import { loginValidator, signupValidator } from "../../validator";
import bcrypt from "bcrypt";
import { UserModel } from "../../models/auth/user.model";
import jwt from "jsonwebtoken";
import config from "../../config";
import { verifyToken } from "../../middleware/verify-token";

const router: express.Router = express.Router();

router.post("/login", async (req, res) => {
  const { success, data } = loginValidator.safeParse(req.body);
  if (!success) {
    return res.status(401).json({
      success: false,
      error: "Invalid schema.",
    });
  }
  try {
    const user = await UserModel.findOne({
      username: data.username,
    });
    const isPasswordValid = await bcrypt.compare(
      data.password,
      user?.passowrd as string,
    );
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        error: "Password doesn't match.",
      });
    }
    const token = jwt.sign(
      { userId: user?._id, userName: user?.username },
      config.jwtSecret,
    );
    console.log("login", token);
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: "Username not found!",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { success, data } = signupValidator.safeParse(req.body);
  if (!success) {
    return res.status(401).json({
      success: false,
      error: "Invalid Schema",
    });
  }
  try {
    const hashedPassword = hashPassword(data.password);
    const user = await UserModel.create({
      username: data.username,
      email: data.email,
      passowrd: hashedPassword,
      name: data.name,
    });
    res.status(200).json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: "Username/email already present. ",
    });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  const userId = req.user?.userId;
  try {
    const user = await UserModel.findById(userId);
    res.status(200).json({
      success: true,
      user: {
        username: user?.username,
        email: user?.email,
        name: user?.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
});

export function hashPassword(password: string): string {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export { router as AuthRouter };
