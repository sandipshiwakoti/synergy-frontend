import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dateformat from "dateformat";
import EmployeeService from "../../../services/EmployeeService";

export default function ViewJob() {
  const employeeId = Number(localStorage.getItem("employeeId"));
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getJob = async () => {
    try {
      const { data } = await EmployeeService.getJobById(employeeId);
      if (data) {
        setJob({
          ...data,
          joinedDate: dateformat(data.joinedDate, "yyyy-mm-dd"),
        });
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  if (isLoading) {
    return (
      <>
        <div class="d-flex justify-content-center">
          <div
            class="spinner-border"
            role="status"
            style={{ width: "5rem", height: "5rem", borderWidth: ".7rem" }}
          >
            <span class="sr-only"></span>
          </div>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <h1>Error...</h1>
      </>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        <Link to="/user/dashboard" className="btn btn-success">
          Back to Dashboard
        </Link>
      </div>
      <h1 className="page-title">View Job Information</h1>
      {job && (
        <form>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="officeName">Office Name</label>
              <input
                type="text"
                className="form-control"
                required
                disabled
                name="officeName"
                value={job.officeName}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="level">Level</label>
              <input
                type="text"
                className="form-control"
                required
                disabled
                name="level"
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
                disabled
                name="position"
                value={job.position}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                className="form-control"
                required
                disabled
                name="branch"
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
                disabled
                name="department"
                value={job.department}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="joinedDate">Joined Date</label>
              <input
                type="date"
                className="form-control"
                required
                disabled
                name="joinedDate"
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
                disabled
                name="serviceYears"
                value={job.serviceYears}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="status">Team Names</label>
              <input
                type="text"
                className="form-control"
                required
                disabled
                name="teamNames"
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
                disabled
                name="transferHistoryDetails"
                value={job.transferHistoryDetails}
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
}
