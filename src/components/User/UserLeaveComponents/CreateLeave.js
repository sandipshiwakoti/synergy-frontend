import { useState } from "react";
import { Link } from "react-router-dom";
import LeaveService from "../../../services/LeaveService";
import { toast } from "react-toastify";

export default function CreateLeave() {
  const employeeId = Number(localStorage.getItem("employeeId"));
  const [leave, setLeave] = useState({
    type: "",
    reasons: "",
    days: "",
    absenceFrom: "",
    status: "Requested",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLeave({ ...leave, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLeave({ ...leave });
      const { data } = await LeaveService.addLeave(employeeId, leave);
      console.log(data);
      if (data) {
        toast.success("Leave added successfully!");
      } else {
        toast.error("Leave cannot be added!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <h1 className="page-title">Submit Leave Application</h1>
      <div className="d-flex justify-content-between">
        <Link to="/user/viewLeaves" className="btn btn-info">
          Click here to see your leave records
        </Link>
        <Link to="/user/dashboard" className="btn btn-success">
          Back to Dashboard
        </Link>
      </div>

      <h1 className="page-subtitle">Leave Application</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control"
            required
            name="type"
            onChange={handleInputChange}
            value={leave.type}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reasons">Reasons</label>
          <input
            type="text"
            className="form-control"
            required
            name="reasons"
            onChange={handleInputChange}
            value={leave.reasons}
          />
        </div>
        <div className="form-group">
          <label htmlFor="days">Days</label>
          <input
            type="text"
            className="form-control"
            required
            name="days"
            onChange={handleInputChange}
            value={leave.days}
          />
        </div>
        <div className="form-group">
          <label htmlFor="absencefrom">Absence From</label>
          <input
            type="date"
            className="form-control"
            required
            name="absenceFrom"
            onChange={handleInputChange}
            value={leave.absenceFrom}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Application
        </button>
      </form>
    </>
  );
}
