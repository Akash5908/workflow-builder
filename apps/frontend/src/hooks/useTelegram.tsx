import config from "@/config";
import axios, { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";

export const Telegram = () => {
  const sendMessage = async (chatID: string, message: string) => {
    try {
      const res = await axios.post(
        `${config.serverApiUrl}/telegram/send-message`,
        {
          chatID: chatID,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        },
      );
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const err = error as AxiosError<{ error: string }>;
        toast.error(err.response?.data.error);
      }
    }
  };
  return { sendMessage };
};
