import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("")
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/reset-password/${token}`, { password })
        if (!res.data.success) {
            setError("Something went wrong, try again")
        }
    } catch (error: any) {
        setError(error.response.data.message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col mt-12 space-y-2">
        {error && (
            <div className="text-red-500 font-light">
                {error}
            </div>
        )}
      <input
        type="password"
        placeholder="New password"
        className="bg-violet-200 p-2 rounded-xl text-violet-950 outline-none focus:ring-2 focus:ring-violet-950"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm password"
        className="bg-violet-200 p-2 rounded-xl text-violet-950 outline-none focus:ring-2 focus:ring-violet-950"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit" className="p-4 bg-violet-400 rounded-xl text-violet-950">Reset Password</button>
    </form>
  );
};

export const ResetPassword = () => {
  const { token } = useParams();
  return <ResetPasswordForm token={token!} />;
};