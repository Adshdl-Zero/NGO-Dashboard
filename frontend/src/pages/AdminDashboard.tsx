import { useEffect, useState } from "react";
import API from "../api/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    API.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {stats && (
        <>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Registrations: {stats.totalRegistrations}</p>
          <p>Total Donations: ₹{stats.totalDonations}</p>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
