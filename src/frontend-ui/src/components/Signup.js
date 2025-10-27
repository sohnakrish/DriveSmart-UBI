import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [passHint, setPassHint] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=(?:.*[a-zA-Z]){5,})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirm) {
      setError("All fields are required. Please fill them out.");
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

    if (password !== confirm) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredPassword", password);
    alert("Signup successful! Please log in.");
    navigate("/login");
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
      <form className="auth-box" onSubmit={handleSignup}>
        <h2>DriveSmart UBI</h2>
        <p className="subtitle">Create a new account</p>

        <label>Email</label>
        <input
          type="text"
          placeholder="driver@ds.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => handlePasswordInput(e.target.value)}
          autoComplete="new-password"
        />
        {passHint && <p className="hint-text">{passHint}</p>}

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="********"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Sign Up</button>

        <p className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
