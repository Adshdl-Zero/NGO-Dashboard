import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const DonationStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const orderId = searchParams.get("orderId");

    if (orderId) {
      const fetchDonation = async () => {
        try {
          const res = await API.get("/donation/me");
          const donations = res.data.donations;
          const currentDonation = donations.find(
            (d: any) => d.id === parseInt(orderId, 10),
          );
          setDonation(currentDonation);
        } catch (err) {
          console.error("Error fetching donation:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchDonation();
    } else {
      setLoading(false);
    }
  }, [searchParams]);

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
        {loading ? (
          <div>
            <p style={{ color: "#7a8ab3", fontSize: "18px" }}>
              Loading donation details...
            </p>
          </div>
        ) : donation ? (
          <div>
            <div
              style={{
                fontSize: "48px",
                marginBottom: "20px",
                animation: "pulse 2s infinite",
              }}
            >
              {donation.status === "SUCCESS"
                ? "✅"
                : donation.status === "FAILED"
                  ? "❌"
                  : "⏳"}
            </div>

            <h2
              style={{
                fontSize: "28px",
                marginBottom: "15px",
                color:
                  donation.status === "SUCCESS"
                    ? "#00ff88"
                    : donation.status === "FAILED"
                      ? "#ff6b6b"
                      : "#ffa500",
              }}
            >
              {donation.status === "SUCCESS"
                ? "Donation Successful!"
                : donation.status === "FAILED"
                  ? "Donation Failed"
                  : "Payment Pending"}
            </h2>

            <p style={{ color: "#7a8ab3", fontSize: "16px", marginBottom: "30px" }}>
              {donation.status === "SUCCESS"
                ? "Thank you for your generous contribution!"
                : donation.status === "FAILED"
                  ? "Unfortunately, your payment could not be processed. Please try again."
                  : "Your payment is being processed. Please wait."}
            </p>

            <div
              style={{
                backgroundColor: "#0f131f",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "30px",
                border: "1px solid #2d3561",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                  padding: "10px 0",
                  borderBottom: "1px solid #2d3561",
                }}
              >
                <span style={{ color: "#7a8ab3" }}>Amount:</span>
                <span style={{ color: "#00ff88", fontWeight: "600" }}>
                  ₹{donation.amount}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                  padding: "10px 0",
                  borderBottom: "1px solid #2d3561",
                }}
              >
                <span style={{ color: "#7a8ab3" }}>Status:</span>
                <span
                  style={{
                    color:
                      donation.status === "SUCCESS"
                        ? "#00ff88"
                        : donation.status === "FAILED"
                          ? "#ff6b6b"
                          : "#ffa500",
                    fontWeight: "600",
                  }}
                >
                  {donation.status}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                }}
              >
                <span style={{ color: "#7a8ab3" }}>Transaction ID:</span>
                <span
                  style={{
                    color: "#00d4ff",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                >
                  {donation.transactionId || "—"}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              style={{
                width: "100%",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "600",
                background: "linear-gradient(135deg, #00d4ff 0%, #00a8d8 100%)",
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
          </div>
        ) : (
          <div>
            <p style={{ color: "#ff6b6b", fontSize: "18px" }}>
              Could not load donation details
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                marginTop: "20px",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "600",
                background: "linear-gradient(135deg, #00d4ff 0%, #00a8d8 100%)",
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
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DonationStatus;
