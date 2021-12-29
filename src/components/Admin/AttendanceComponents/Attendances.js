import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AttendanceService from "../../../services/AttendanceService";
import EmployeeService from "../../../services/EmployeeService";

const Attendances = () => {
  const [employee, setEmployee] = useState({});
  const [id, setId] = useState("");

  const getEmployee = async () => {
    const { data } = await EmployeeService.getEmployee(id);
    setEmployee(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getEmployee();
  };

  const removeAttendance = async (id) => {
    try {
      const { data } = await AttendanceService.removeAttendance(id);
      if (data) {
        toast.success("Attendance has been removed Successfully!");
        getEmployee();
      } else {
        toast.error("Attendance cannot beremoved!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <h1 className="page-title">Attendance Records</h1>
      {/* <div className="d-flex justify-content-end">
        <Link to="/admin/dashboard" className="btn btn-success">
          Back to Dashboard
        </Link>
      </div> */}
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
        <button className="btn btn-primary">Get Attendance Records</button>
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
      {employee.attendances != null && (
        <table className="table-bordered table-striped w-100 mt-2">
          <thead>
            <tr>
              <th>Id</th>
              <th>Clock in</th>
              <th>Clock out</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.attendances.map(({ id, clockIn, clockOut }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{clockIn}</td>
                  <td>{clockOut}</td>
                  <td>
                    <button
                      onClick={() => removeAttendance(id)}
                      className=" btn btn-danger m-2"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/updateAttendance/${id}`}
                      className="btn btn-secondary"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Attendances;
