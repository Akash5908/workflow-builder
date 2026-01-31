import axios from "axios";
import { sendTelegramMessage } from "./telegram";
import {
  CredentialModel,
  CredsType,
} from "../models/credential/credential.model";
import { sendMail } from "./send-mail";

interface ExecutionData {
  userId?: string;
  chatID?: string;
  email?: string;
  subject?: string;
  message?: string;
  host?: string;
  port?: number;
  pass?: string;
  token?: string;
  user?: string;
}

export const executeTelegram = async (data: ExecutionData) => {
  const res = await sendTelegramMessage(
    data?.token!,
    data.chatID!,
    data.message!,
  );
  console.log("telegram message send");
};

export const executeEmail = async (data: ExecutionData) => {
  const mailData = {
    email: data?.email!,
    message: data?.message!,
    subject: data?.subject!,
    host: data?.host!,
    pass: data?.pass!,
    user: data?.user!,
  };
  await sendMail(mailData);
  console.log("email send");
};
