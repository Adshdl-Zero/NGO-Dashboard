import API from "../api/api";

const UserDashboard = () => {
  const register = async () => {
    await API.post("/registration", {
      phone: "9999999999",
      address: "India",
      additionalInfo: "Volunteer",
    });
    alert("Registered");
  };

  const donate = async () => {
    const res = await API.post("/donation/initiate", { amount: 500 });
    await API.post("/donation/callback", {
      donationId: res.data.donationId,
      status: "SUCCESS",
    });
    alert("Donation successful");
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={register}>Register</button>
      <button onClick={donate}>Donate ₹500</button>
    </div>
  );
};

export default UserDashboard;
