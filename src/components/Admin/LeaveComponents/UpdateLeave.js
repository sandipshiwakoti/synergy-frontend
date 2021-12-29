import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dateformat from "dateformat";
import LeaveService from "../../../services/LeaveService";

const UpdateLeave = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState({
    id: id,
    type: "",
    reasons: "",
    days: "",
    absenceFrom: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLeave({ ...leave, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await LeaveService.updateLeave(id, leave);
      console.log(data);
      if (data) {
        toast.success("Leave updated successfully!");
      } else {
        toast.error("Leave cannot be updated!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getLeave = async () => {
    const { data } = await LeaveService.getLeave(id);
    data.absenceFrom = dateformat(data.absenceFrom, "yyyy-mm-dd");
    setLeave(data);
  };

  useEffect(() => {
    console.log("Effect");
    getLeave(id);
  }, []);

  return (
    <>
      <h1>Update Leave</h1>
      <div className="d-flex justify-content-end">
        <Link to="/leaves" className="btn btn-success">
          Back to Search List
        </Link>
      </div>

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
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            className="form-select form-select-lg mb-3"
            onChange={handleInputChange}
            value={leave.status}
            required
          >
            <option value=""></option>
            <option value="Requested">Requested</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateLeave;
