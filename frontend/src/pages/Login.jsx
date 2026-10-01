import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // ProtectedRoute previous page
  const from = location.state?.from || "/";

  // ==========================================
  // EMAIL / PASSWORD LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      if (!data) {
        toast.error("Login failed");
        return;
      }

      // Create assignment JWT
      const tokenResponse = await fetch(
        "http://localhost:5000/api/auth/token",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenData.success) {
        toast.error("JWT authentication failed");
        return;
      }

      // Prevent duplicate success toast
      toast.success("Login successful!", {
        id: "login-success",
      });

      // Previous protected page
      navigate(from, {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GOOGLE LOGIN
  // ==========================================

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:5173/auth/callback",
      });
    } catch (error) {
      console.error("Google login error:", error);

      toast.error("Google login failed");
    }
  };

  // ==========================================
  // APPLE LOGIN
  // ==========================================

  const handleAppleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "apple",
        callbackURL: "http://localhost:5173/auth/callback",
      });
    } catch (error) {
      console.error("Apple login error:", error);

      toast.error(
        "Apple login is not configured yet."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-[450px]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 rounded-3xl bg-white p-7 shadow-lg sm:p-8"
        >
          {/* Header */}
          <div className="mb-2 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Login to your StudyNook account
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-slate-900">
              Email
            </label>

            <div className="flex h-[50px] items-center rounded-xl border-[1.5px] border-slate-200 px-3 transition focus-within:border-blue-500">
              <Mail
                size={20}
                className="shrink-0 text-slate-500"
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your Email"
                required
                className="ml-3 h-full w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-slate-900">
              Password
            </label>

            <div className="flex h-[50px] items-center rounded-xl border-[1.5px] border-slate-200 px-3 transition focus-within:border-blue-500">
              <Lock
                size={20}
                className="shrink-0 text-slate-500"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your Password"
                required
                className="ml-3 h-full w-full border-none bg-transparent pr-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                className="shrink-0 text-slate-500 transition hover:text-slate-900"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
                className="h-4 w-4 rounded border-slate-300 accent-blue-600"
              />

              <span>Remember me</span>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 h-[50px] w-full rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

          {/* Register */}
          <p className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </p>

          {/* Divider */}
          <div className="my-1 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium text-slate-400">
              OR WITH
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:bg-slate-50"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 12.27c0-.77-.07-1.51-.2-2.23H12v4.22h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.38Z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.98c2.63 0 4.84-.87 6.45-2.34l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.98Z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.54 14.09A5.85 5.85 0 0 1 6.23 12c0-.72.12-1.42.31-2.09V7.38H3.3A9.98 9.98 0 0 0 2.25 12c0 1.67.4 3.25 1.05 4.62l3.24-2.53Z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.88c1.43 0 2.72.49 3.73 1.45l2.79-2.79C16.84 2.99 14.63 2.02 12 2.02a9.74 9.74 0 0 0-8.7 5.36l3.24 2.53C7.31 7.6 9.46 5.88 12 5.88Z"
                />
              </svg>

              Google
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={handleAppleLogin}
              className="flex h-12.5 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-slate-900"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.81 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.32 2.99-2.53 4.07ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />
              </svg>

              Apple
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;