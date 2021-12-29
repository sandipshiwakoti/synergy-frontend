import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AttendanceService from "../../../services/AttendanceService";

const UpdateAttendance = () => {
  const { id } = useParams();
  const [attendance, setAttendance] = useState({
    id: id,
    clockIn: "",
    clockOut: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAttendance({ ...attendance, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await AttendanceService.updateAttendance(id, attendance);
      console.log(data);
      if (data) {
        toast.success("Attendance updated successfully!");
      } else {
        toast.error("Attendance cannot be updated!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getAttendance = async () => {
    const { data } = await AttendanceService.getAttendance(id);
    setAttendance(data);
  };

  useEffect(() => {
    console.log("Effect");
    getAttendance(id);
  }, []);

  return (
    <>
      <h1>Update Attendance</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="clockId">Clock In</label>
          <input
            type="text"
            className="form-control"
            required
            name="clockIn"
            onChange={handleInputChange}
            value={attendance.clockIn}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clockOut">Clock Out</label>
          <input
            type="text"
            className="form-control"
            required
            name="clockOut"
            onChange={handleInputChange}
            value={attendance.clockOut}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateAttendance;
