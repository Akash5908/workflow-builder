import config from "@/config";
import useAuthStore from "@/lib/useAuthStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { type WorkflowProp } from "common/types";

export const useWorkflow = () => {
  const { user } = useAuthStore() as { user: { _id: string } };
  const [workflow, setWorkflow] = useState<WorkflowProp[]>([]);

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const res = await axios.get(`${config.serverApiUrl}/workflow`, {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        });
        const data = res.data;
        if (res.status === 200) {
          setWorkflow(data.workflow);
        }
      } catch (error: unknown) {
        console.error(error);
      }
    };
    fetchWorkflow();
  }, [user]);

  return workflow;
};
