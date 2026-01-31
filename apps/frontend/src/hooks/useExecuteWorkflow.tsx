import config from "@/config";
import axios, { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";

export const ExecuteWorkflow = (workflowId: string) => {
  const executeWorkflow = async () => {
    try {
      const res = await axios.put(
        `${config.serverApiUrl}/workflow/execute/${workflowId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        },
      );
      if (res.status === 200) {
        return toast.success(res.data.message);
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const err = error as AxiosError<{ error: string }>;
        return toast.error(err.response?.data.error);
      }
    }
  };
  return { executeWorkflow };
};
