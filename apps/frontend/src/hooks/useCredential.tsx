import config from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

interface CredsProp {
  _id: string;
  name: string;
  type: string;
  createdAt: Date;
}

export const useCredential = () => {
  const [creds, setCreds] = useState<CredsProp[]>();

  useEffect(() => {
    const fetchCreds = async () => {
      try {
        const res = await axios.get(`${config.serverApiUrl}/credential`, {
          headers: {
            Authorization: `Bearers ${config.accessToken}`,
          },
        });
        if (res.status === 200) {
          return setCreds(res.data.credential);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCreds();
  }, []);
  return { creds };
};
