import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext, type AuthContextProps } from "@/context/AuthContext";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext) as AuthContextProps;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      axios
        .get(`http://localhost:3000/api/v1/user/oauth/google?code=${code}`)
        .then(_ => {
          fetchUser();
          navigate("/");
        })
        .catch(err => console.error(err));
    }
  }, [navigate, fetchUser]);

  return <p>Logging you in...</p>;
}
