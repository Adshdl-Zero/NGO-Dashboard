import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userEmail", email);

      if (res.data.role === "ADMIN") navigate("/admin");
      else navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "50px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #161b28 0%, #1a1f2e 100%)",
          border: "1px solid #2d3545",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 212, 255, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #00d4ff, #00f0ff)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            🔑
          </div>
          <h1
            style={{
              margin: "0 0 12px 0",
              fontSize: "32px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #00d4ff 0%, #00f0ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NGOHub
          </h1>
          <p style={{ color: "#8b92a9", margin: "0", fontSize: "14px" }}>
            Access your nonprofit dashboard
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 16px",
              marginBottom: "20px",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              borderRadius: "8px",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "#8b92a9", marginBottom: "6px", display: "block", fontWeight: "600" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "14px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid #2d3545",
                borderRadius: "8px",
                color: "#e8ebf0",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "#8b92a9", marginBottom: "6px", display: "block", fontWeight: "600" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "14px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid #2d3545",
                borderRadius: "8px",
                color: "#e8ebf0",
              }}
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 16px",
            marginBottom: "12px",
            fontSize: "16px",
            fontWeight: "600",
            background: "linear-gradient(135deg, #00d4ff 0%, #00f0ff 100%)",
            color: "#0f1419",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(0, 212, 255, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <button
          onClick={() => navigate("/register")}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "16px",
            fontWeight: "600",
            background: "transparent",
            color: "#00d4ff",
            border: "1px solid rgba(0, 212, 255, 0.3)",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0, 212, 255, 0.1)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0, 212, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0, 212, 255, 0.3)";
          }}
        >
          Create New Account
        </button>

        <p style={{ fontSize: "12px", color: "#8b92a9", textAlign: "center", marginTop: "24px", margin: "24px 0 0" }}>
          Demo: Use test credentials to explore
        </p>
      </div>
    </div>
  );
};

export default Login;
