import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext, type AuthContextProps } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext) as AuthContextProps;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/user/oauth/google?code=${code}`)
        .then(_ => {
          fetchUser();
          navigate("/");
        })
        .catch(err => console.error(err));
    }
  }, [navigate, fetchUser]);

  return <div className="flex items-center justify-center h-screen w-screen">
    {/* <Skeleton className="h-[20px] w-[100px] rounded-full" /> */}
    <Loader2 size={24} className="animate-spin" />
  </div>;
}
