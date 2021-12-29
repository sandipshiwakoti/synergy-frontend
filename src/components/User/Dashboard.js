import { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function UserDashboard() {
  const [value, setValue] = useState(new Date());
  return (
    <>
      <h1 className="page-title">User Dashboard</h1>
      <div className="d-flex justify-content-center align-items-start gap-4">
        <div>
          <h1 className="page-subtitle m-0">Calendar</h1>
          <Calendar onChange={setValue} value={value} selectRange={true} />
        </div>
        <div className="dashboard-container">
          <Link to="/user/createLeave" className="dashboard-item">
            Create Leave Application
          </Link>
          <Link to="/user/information" className="dashboard-item">
            View Employee information
          </Link>
          <Link to="/user/attendance" className="dashboard-item">
            Take Attendance
          </Link>
          <Link to="/user/viewJob" className="dashboard-item">
            View Job Information
          </Link>
        </div>
      </div>
    </>
  );
}
