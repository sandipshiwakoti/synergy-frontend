import { useState } from "react";
import { Link } from "react-router-dom";
import dateformat from "dateformat";
import EmployeeService from "../../../services/EmployeeService";

const Jobs = () => {
  const [employee, setEmployee] = useState({});
  const [id, setId] = useState("");

  const getEmployee = async () => {
    const { data } = await EmployeeService.getEmployee(id);
    const { data: job } = await EmployeeService.getJobById(id);
    job.joinedDate = dateformat(data.joinedDate, "yyyy-mm-dd");
    setEmployee({ ...data, job });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getEmployee();
  };

  return (
    <>
      <h1 className="page-title">Job Records</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Enter employee id</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setId(e.target.value);
            }}
            value={id}
            required
          />
        </div>
        <button className="btn btn-primary">Get Job Records</button>
      </form>
      {employee.personalInformation && (
        <div className="card">
          <h3 className="page-subtitle">Employee details</h3>
          <div className="card-body">
            <h5 className="card-title">Id: {employee.id}</h5>
            <h5 className="card-title">
              Fullname: {employee.personalInformation.fullname}
            </h5>
            <h5 className="card-title">
              Email: {employee.personalInformation.email}
            </h5>
          </div>
        </div>
      )}

      {employee.job && (
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
                value={employee.job.officeName}
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
                value={employee.job.level}
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
                value={employee.job.position}
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
                value={employee.job.branch}
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
                value={employee.job.department}
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
                value={employee.job.joinedDate}
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
                value={employee.job.serviceYears}
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
                value={employee.job.teamNames}
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
                value={employee.job.transferHistoryDetails}
              />
            </div>
          </div>
          <Link
            to={`/updateJob/${employee.job.id}`}
            className="btn btn-secondary"
          >
            Go to update form
          </Link>
        </form>
      )}
    </>
  );
};

export default Jobs;
