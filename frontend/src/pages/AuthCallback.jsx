import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const createJWT = async () => {
      try {
        // Check Better Auth session
        const { data: session, error } = await authClient.getSession();

        if (error || !session?.user) {
          toast.error("Authentication failed");
          navigate("/login");
          return;
        }

        // Create assignment JWT
        const response = await fetch(
          "http://localhost:5000/api/auth/token",
          {
            method: "POST",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          toast.error("JWT authentication failed");
          navigate("/login");
          return;
        }

        toast.success("Login successful!");

        navigate("/");
      } catch {
        toast.error("Something went wrong");
        navigate("/login");
      }
    };

    createJWT();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-300 border-t-slate-900 mx-auto"></div>

        <p className="mt-4 text-slate-600">
          Completing authentication...
        </p>
      </div>
    </div>
  );
}

export default AuthCallback;