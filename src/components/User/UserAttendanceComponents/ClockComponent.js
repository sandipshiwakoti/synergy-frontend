import Clock from "react-clock";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-clock/dist/Clock.css";
import AttendanceService from "../../../services/AttendanceService";

export default function ClockComponent() {
  const employeeId = Number(localStorage.getItem("employeeId"));
  const [value, setValue] = useState("");
  const [clockIn, setClockIn] = useState(localStorage.getItem("clockIn") || "");
  const [clockOut, setClockOut] = useState("");
  const [isTimerStart, setIsTimerStart] = useState(
    localStorage.getItem("clockIn") ? true : false
  );
  const startBtnRef = useRef(null);
  const finishBtnRef = useRef(null);

  const startWork = () => {
    setIsTimerStart(true);
    setValue(new Date());
    setClockIn(new Date());
    startBtnRef.current.disabled = "true";
    localStorage.setItem("clockIn", new Date());
  };

  const finishWork = async () => {
    localStorage.setItem("clockIn", "");
    setIsTimerStart(false);
    const currDateTime = new Date();
    setClockOut(currDateTime);
    finishBtnRef.current.disabled = "true";
    const attendance = { clockIn, clockOut: currDateTime };
    const { data } = await AttendanceService.addAttendance(
      employeeId,
      attendance
    );
    console.log(data);
    toast.success("Attendance taken successfully!");
  };

  useEffect(() => {
    let intervalId;
    if (isTimerStart) {
      intervalId = setInterval(() => {
        return setValue(new Date());
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  });
  return (
    <>
      <div className="d-flex justify-content-end">
        <Link to="/user/dashboard" className="btn btn-success">
          Back to Dashboard
        </Link>
      </div>
      <h1 className="page-title">Attendance</h1>
      <div className="d-flex justify-content-center">
        <Clock value={value}></Clock>
      </div>
      <div className="d-flex justify-content-center gap-2 m-3">
        <button
          onClick={startWork}
          ref={startBtnRef}
          className="btn btn-primary"
        >
          Start
        </button>
        <button
          onClick={finishWork}
          ref={finishBtnRef}
          className="btn btn-secondary"
        >
          Finished
        </button>
      </div>

      <h1 className="page-subtitle text-center">Attendance Report</h1>
      <h3 className="text-center">Clock In: {clockIn.toLocaleString()}</h3>
      <h3 className="text-center">Clock Out: {clockOut.toLocaleString()}</h3>
    </>
  );
}
