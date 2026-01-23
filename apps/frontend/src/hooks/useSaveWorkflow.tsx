import config from "@/config";
import type { WorkflowProp } from "common/types";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const SaveWorkflow = () => {
  async function saveWorkflow(workflow: WorkflowProp) {
    try {
      const res = await axios.put(
        `${config.serverApiUrl}/workflow/${workflow._id}`,
        { workflow },
        {
          headers: { Authorization: `Bearer ${config.accessToken}` },
        },
      );
      if (res.status === 200) {
        toast.success("Workflow saved.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ error: string }>;
        toast.error(err.response?.data?.error || "Failed to save workflow");
        console.error(err.response?.data?.error);
      }
    }
  }
  return { saveWorkflow };
};
