
import { useState } from "react";

import {
  LockKeyhole,
  UserRound,
  LogIn,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({
    employeeId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.employeeId.trim() || !form.password.trim()) {
      setError("Please enter your employee ID and password.");
      return;
    }

    setError("");

    if (typeof onLogin === "function") {
      onLogin({
        employeeId: form.employeeId.trim(),
        password: form.password,
      });
    } else {
      setError("Login functionality is not connected.");
    }
  };

  return (
    <main className="employee-login-page">
      <section className="employee-login-card">
        <div className="employee-login-logo">H</div>

        <h1>HADIYA ZONE DEPARTEMANT OF SCIENCE AND TECHNOLOGY HRMS</h1>
        <p className="employee-login-subtitle">
          Employee Portal
        </p>

        <div className="employee-login-security">
          <ShieldCheck size={20} />
          <span>Secure employee access</span>
        </div>

        {error && (
          <div className="employee-login-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="module-field">
            <span>Employee ID</span>

            <div className="module-input-icon">
              <UserRound size={18} />

              <input
                type="text"
                value={form.employeeId}
                onChange={(event) => {
                  setForm({
                    ...form,
                    employeeId: event.target.value,
                  });
                  setError("");
                }}
                placeholder="Enter your employee ID"
                autoComplete="username"
                required
              />
            </div>
          </label>

          <label className="module-field">
            <span>Password</span>

            <div className="module-input-icon">
              <LockKeyhole size={18} />

              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) => {
                  setForm({
                    ...form,
                    password: event.target.value,
                  });
                  setError("");
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="login-password-toggle"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </label>

          <button className="common-button primary" type="submit">
            <LogIn size={18} />
            Sign In
          </button>
        </form>

        <small>Authorized employees only.</small>
      </section>
    </main>
  );
}
