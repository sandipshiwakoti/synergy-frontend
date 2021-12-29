import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dateformat from "dateformat";
import JobService from "../../../services/JobService";

const UpdateJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState({
    id: id,
    officeName: "",
    level: "",
    position: "",
    branch: "",
    department: "",
    joinedDate: "",
    serviceYears: "",
    teamNames: "",
    transferHistoryDetails: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await JobService.updateJob(id, job);
      console.log(data);
      if (data) {
        toast.success("Job updated successfully!");
      } else {
        toast.error("Job cannot be updated!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getJob = async () => {
    const { data } = await JobService.getJob(id);
    data.joinedDate = dateformat(data.joinedDate, "yyyy-mm-dd");
    setJob(data);
  };

  useEffect(() => {
    console.log("Effect");
    getJob(id);
  }, []);

  return (
    <>
      <h1>Update Job</h1>
      <div className="d-flex justify-content-end">
        <Link to="/Jobs" className="btn btn-success">
          Back to Search List
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="officeName">Office Name</label>
            <input
              type="text"
              className="form-control"
              required
              name="officeName"
              onChange={handleInputChange}
              value={job.officeName}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="level">Level</label>
            <input
              type="text"
              className="form-control"
              required
              name="level"
              onChange={handleInputChange}
              value={job.level}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              className="form-control"
              required
              name="position"
              onChange={handleInputChange}
              value={job.position}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="branch">Branch</label>
            <input
              type="text"
              className="form-control"
              required
              name="branch"
              onChange={handleInputChange}
              value={job.branch}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="status">Department</label>
            <input
              type="text"
              className="form-control"
              required
              name="department"
              onChange={handleInputChange}
              value={job.department}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="joinedDate">Joined Date</label>
            <input
              type="date"
              className="form-control"
              required
              name="joinedDate"
              onChange={handleInputChange}
              value={job.joinedDate}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="serviceYears">Years of Services</label>
            <input
              type="text"
              className="form-control"
              required
              name="serviceYears"
              onChange={handleInputChange}
              value={job.serviceYears}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="status">Team Names</label>
            <input
              type="text"
              className="form-control"
              required
              name="teamNames"
              onChange={handleInputChange}
              value={job.teamNames}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="transferHistoryDetails">
              Transfer History Details
            </label>
            <input
              type="text"
              className="form-control"
              required
              name="transferHistoryDetails"
              onChange={handleInputChange}
              value={job.transferHistoryDetails}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateJob;
