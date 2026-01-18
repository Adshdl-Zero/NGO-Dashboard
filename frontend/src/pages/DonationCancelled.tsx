import { useNavigate } from "react-router-dom";

const DonationCancelled = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          fontSize: "14px",
          fontWeight: "600",
          background: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        🚪 Logout
      </button>
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "40px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #141928 0%, #1a2244 100%)",
          border: "1px solid #2d3561",
          boxShadow: "0 0 30px rgba(0, 212, 255, 0.1)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>⏸️</div>

        <h2
          style={{
            fontSize: "28px",
            marginBottom: "15px",
            color: "#ffa500",
          }}
        >
          Payment Cancelled
        </h2>

        <p style={{ color: "#7a8ab3", fontSize: "16px", marginBottom: "30px" }}>
          Your donation has been cancelled. No charges have been made. You can
          try again anytime.
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "600",
              background:
                "linear-gradient(135deg, #00d4ff 0%, #00a8d8 100%)",
              color: "#0a0e27",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "600",
              background:
                "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationCancelled;
