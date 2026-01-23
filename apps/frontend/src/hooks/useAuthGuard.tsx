import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = (redirectTo: string, checkIsLogged: boolean) => {
  const navigate = useNavigate();
  const session = localStorage.getItem("user-session");
  const isLoggedIn = JSON.parse(session!).state.isLoggedIn;

  useEffect(() => {
    if (isLoggedIn === checkIsLogged) {
      navigate(redirectTo!, { replace: true });
    }
  }, [isLoggedIn, checkIsLogged, redirectTo, navigate]);
};
