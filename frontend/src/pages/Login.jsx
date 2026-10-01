import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const fieldBox =
  "flex h-[50px] items-center rounded-xl border-[1.5px] border-slate-200 px-3 transition focus-within:border-blue-500";
const inputClass =
  "ml-3 h-full w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
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
  );
}

function Login() {
  useTitle("Login");

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // ProtectedRoute previous page
  const from = location.state?.from || "/";

  // ==========================================
  // EMAIL / PASSWORD LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email.trim() || !password) {
      setFormError("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error || !data) {
        const message = "Invalid email or password";
        setFormError(message);
        toast.error(message);
        return;
      }

      // Create assignment JWT (HTTP-only cookie)
      const tokenResponse = await fetch("/api/auth/token", {
        method: "POST",
        credentials: "include",
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenData.success) {
        toast.error("Authentication failed. Please try again.");
        return;
      }

      toast.success("Login successful!", { id: "login-success" });

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
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
        callbackURL: "/auth/callback",
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
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
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-slate-500">
              Login to your StudyNook account
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-slate-900">
              Email
            </label>

            <div className={fieldBox}>
              <Mail size={20} className="shrink-0 text-slate-500" />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-slate-900">
              Password
            </label>

            <div className={fieldBox}>
              <Lock size={20} className="shrink-0 text-slate-500" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={`${inputClass} pr-2`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="shrink-0 text-slate-500 transition hover:text-slate-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {/* Inline error */}
          {formError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {formError}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-[50px] w-full rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="my-1 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:bg-slate-50"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Register link */}
          <p className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;