import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailHint, setEmailHint] = useState("");
  const [passHint, setPassHint] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=(?:.*[a-zA-Z]){5,})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both Email and Password.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid Email address (e.g., driver@ds.com).");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8+ characters with 5+ letters, 1 uppercase, 1 number, and 1 special character."
      );
      return;
    }

    // Successful login simulation
    localStorage.setItem("userLoggedIn", true);
    navigate("/dashboard");
  };

  const handleEmailInput = (value) => {
    setEmail(value);
    if (!value) setEmailHint("");
    else if (!emailRegex.test(value))
      setEmailHint("✉️ Email should look like driver@ds.com");
    else setEmailHint("✅ Looks good!");
  };

  const handlePasswordInput = (value) => {
    setPassword(value);
    if (!value) setPassHint("");
    else if (value.length < 8) setPassHint("🧩 Must be at least 8 characters");
    else if (!/[A-Z]/.test(value)) setPassHint("🔠 Add one uppercase letter");
    else if (!/\d/.test(value)) setPassHint("🔢 Add one number");
    else if (!/[!@#$%^&*]/.test(value))
      setPassHint("✨ Add one special character (!@#$...)");
    else setPassHint("✅ Strong password!");
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>DriveSmart UBI</h2>
        <p className="subtitle">Login to your account</p>

        <label>Email</label>
        <input
          type="text"
          placeholder="driver@ds.com"
          value={email}
          onChange={(e) => handleEmailInput(e.target.value)}
          autoComplete="off"
          className={emailHint.includes("✅") ? "valid-input" : ""}
        />
        {emailHint && <p className="hint-text">{emailHint}</p>}

        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => handlePasswordInput(e.target.value)}
          autoComplete="new-password"
          className={passHint.includes("✅") ? "valid-input" : ""}
        />
        {passHint && <p className="hint-text">{passHint}</p>}

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Login</button>

        <p className="footer-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
