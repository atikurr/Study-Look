import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

function AuthCallback() {
  const navigate = useNavigate();

  // Prevent duplicate execution
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) {
      return;
    }

    hasProcessed.current = true;

    const createJWT = async () => {
      try {
        /* ==========================================
           CHECK BETTER AUTH SESSION
        ========================================== */

        const {
          data: session,
          error,
        } = await authClient.getSession();

        if (error || !session?.user) {
          toast.error("Authentication failed", {
            id: "auth-failed",
          });

          navigate("/login", {
            replace: true,
          });

          return;
        }

        /* ==========================================
           CREATE ASSIGNMENT JWT
        ========================================== */

        const response = await fetch(
          "http://localhost:5000/api/auth/token",
          {
            method: "POST",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          toast.error("JWT authentication failed", {
            id: "jwt-auth-failed",
          });

          navigate("/login", {
            replace: true,
          });

          return;
        }

        /* ==========================================
           SUCCESS
        ========================================== */

        toast.success("Login successful!", {
          id: "login-success",
        });

        navigate("/", {
          replace: true,
        });
      } catch (error) {
        console.error(
          "Authentication callback error:",
          error
        );

        toast.error(
          "Something went wrong. Please try again.",
          {
            id: "auth-error",
          }
        );

        navigate("/login", {
          replace: true,
        });
      }
    };

    createJWT();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        {/* Loading Spinner */}

        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />

        <h1 className="mt-5 text-lg font-semibold text-slate-900">
          Completing authentication...
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while we sign you in.
        </p>
      </div>
    </div>
  );
}

export default AuthCallback;