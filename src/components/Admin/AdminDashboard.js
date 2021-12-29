import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <section class="dashboard">
        <h1 className="page-title">Dashboard</h1>
        <div className="dashboard-container">
          <Link to="/viewEmployees" className="dashboard-item">
            Manage Employee Information
          </Link>
          <Link to="/jobs" className="dashboard-item">
            Manage Job Information
          </Link>
          <Link to="/leaves" className="dashboard-item">
            Manage Leaves Information
          </Link>
          <Link to="/attendances" className="dashboard-item">
            Manage Attendance Information
          </Link>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
