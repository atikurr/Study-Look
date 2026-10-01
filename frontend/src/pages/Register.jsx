import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
} from "lucide-react";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const fieldBox =
  "flex h-[50px] items-center rounded-xl border-[1.5px] border-slate-200 px-3 transition focus-within:border-blue-500";

const inputClass =
  "ml-3 h-full w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400";

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
  );
}

function Register() {
  useTitle("Register");

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] =
    useState("");

  // ==========================================
  // PASSWORD VALIDATION
  // ==========================================

  const validatePassword = () => {
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const handleRegister = async (event) => {
    event.preventDefault();

    setPasswordError("");

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!photoURL.trim()) {
      toast.error("Please enter your photo URL.");
      return;
    }

    const validationError =
      validatePassword();

    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    setLoading(true);

    try {
      const { data, error } =
        await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
          image: photoURL.trim(),
        });

      if (error || !data) {
        console.error(
          "Registration error:",
          error
        );

        toast.error(
          error?.message ||
            "Registration failed."
        );

        return;
      }

      // Better Auth creates a session after
      // successful registration.
      //
      // Assignment requires the user to login
      // manually after registration.
      try {
        await authClient.signOut();
      } catch (signOutError) {
        console.error(
          "Sign out after registration failed:",
          signOutError
        );
      }

      toast.success(
        "Registration successful! Please login."
      );

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GOOGLE REGISTER / LOGIN
  // ==========================================

  const handleGoogleRegister = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/auth/callback",
      });
    } catch (error) {
      console.error(
        "Google registration error:",
        error
      );

      toast.error(
        "Google registration failed."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">

      <div className="w-full max-w-[450px]">

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4 rounded-3xl bg-white p-7 shadow-lg sm:p-8"
        >

          {/* ======================================
              HEADER
          ====================================== */}

          <div className="mb-2 text-center">

            <h1 className="text-3xl font-bold text-slate-900">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Join StudyNook today
            </p>

          </div>

          {/* ======================================
              NAME
          ====================================== */}

          <div className="flex flex-col gap-2">

            <label
              htmlFor="name"
              className="font-semibold text-slate-900"
            >
              Full Name
            </label>

            <div className={fieldBox}>

              <User
                size={20}
                className="shrink-0 text-slate-500"
              />

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className={inputClass}
              />

            </div>
          </div>

          {/* ======================================
              EMAIL
          ====================================== */}

          <div className="flex flex-col gap-2">

            <label
              htmlFor="email"
              className="font-semibold text-slate-900"
            >
              Email
            </label>

            <div className={fieldBox}>

              <Mail
                size={20}
                className="shrink-0 text-slate-500"
              />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                required
                autoComplete="email"
                className={inputClass}
              />

            </div>
          </div>

          {/* ======================================
              PHOTO URL
          ====================================== */}

          <div className="flex flex-col gap-2">

            <label
              htmlFor="photoURL"
              className="font-semibold text-slate-900"
            >
              Photo URL
            </label>

            <div className={fieldBox}>

              <Camera
                size={20}
                className="shrink-0 text-slate-500"
              />

              <input
                id="photoURL"
                type="url"
                value={photoURL}
                onChange={(event) =>
                  setPhotoURL(event.target.value)
                }
                placeholder="https://example.com/photo.jpg"
                required
                autoComplete="url"
                className={inputClass}
              />

            </div>
          </div>

          {/* ======================================
              PASSWORD
          ====================================== */}

          <div className="flex flex-col gap-2">

            <label
              htmlFor="password"
              className="font-semibold text-slate-900"
            >
              Password
            </label>

            <div className={fieldBox}>

              <Lock
                size={20}
                className="shrink-0 text-slate-500"
              />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) => {
                  setPassword(
                    event.target.value
                  );
                  setPasswordError("");
                }}
                placeholder="Create a password"
                required
                autoComplete="new-password"
                className={`${inputClass} pr-2`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                className="shrink-0 text-slate-500 transition hover:text-slate-900"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>

            <p className="text-xs text-slate-400">
              Minimum 6 characters, including
              uppercase and lowercase letters.
            </p>

          </div>

          {/* ======================================
              CONFIRM PASSWORD
          ====================================== */}

          <div className="flex flex-col gap-2">

            <label
              htmlFor="confirmPassword"
              className="font-semibold text-slate-900"
            >
              Confirm Password
            </label>

            <div className={fieldBox}>

              <Lock
                size={20}
                className="shrink-0 text-slate-500"
              />

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(
                    event.target.value
                  );
                  setPasswordError("");
                }}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                className={`${inputClass} pr-2`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
                className="shrink-0 text-slate-500 transition hover:text-slate-900"
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>

          </div>

          {/* ======================================
              PASSWORD ERROR
          ====================================== */}

          {passwordError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {passwordError}
            </p>
          )}

          {/* ======================================
              REGISTER BUTTON
          ====================================== */}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-[50px] w-full rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

          {/* ======================================
              DIVIDER
          ====================================== */}

          <div className="my-1 flex items-center gap-3">

            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />

          </div>

          {/* ======================================
              GOOGLE
          ====================================== */}

          <button
            type="button"
            onClick={
              handleGoogleRegister
            }
            className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:bg-slate-50"
          >
            <GoogleIcon />

            Continue with Google
          </button>

          {/* ======================================
              LOGIN
          ====================================== */}

          <p className="text-center text-sm text-slate-600">

            Already have an account?{" "}

            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </button>

          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;