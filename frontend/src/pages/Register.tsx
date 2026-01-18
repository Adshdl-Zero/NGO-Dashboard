import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Name, email, and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
        phone,
        address,
        additionalInfo,
      });

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
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
          maxWidth: "520px",
          padding: "50px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #161b28 0%, #1a1f2e 100%)",
          border: "1px solid #2d3545",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0, 212, 255, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
            }}
          >
            📝
          </div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #00d4ff, #00f0ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 12px 0",
            }}
          >
            Create Account
          </h1>
          <p style={{ color: "#8b92a9", fontSize: "14px", margin: "0" }}>
            Join our community of donors
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
              Full Name *
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Email *
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Password *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Phone
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              Address
            </label>
            <input
              type="text"
              placeholder="123 Main St, City, Country"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              Account Type
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "14px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid #2d3545",
                borderRadius: "8px",
                color: "#e8ebf0",
              }}
            >
              <option value="USER">Donor</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "#8b92a9", marginBottom: "6px", display: "block", fontWeight: "600" }}>
              Additional Information
            </label>
            <textarea
              placeholder="Tell us more about yourself (optional)"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "14px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid #2d3545",
                color: "#e8ebf0",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontWeight: "600",
            background: "linear-gradient(135deg, #00d4ff 0%, #00f0ff 100%)",
            color: "#0f1419",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
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
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "12px 16px",
            background: "transparent",
            color: "#00d4ff",
            border: "1px solid rgba(0, 212, 255, 0.3)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
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
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Register;
