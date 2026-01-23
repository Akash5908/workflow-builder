import config from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProfileProps {
  _id: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileProps>({
    _id: "",
    email: "",
    name: "",
    isLoggedIn: false,
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${config.serverApiUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        });
        if (res.status === 200) {
          const user = res.data.user;
          setProfile({
            _id: user._id,
            email: user.email,
            name: user.name,
            isLoggedIn: true,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  return { profile, loading };
}
