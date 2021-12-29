import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LeaveService from "../../../services/LeaveService";
import EmployeeService from "../../../services/EmployeeService";

const Leaves = () => {
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

  const removeLeave = async (id) => {
    try {
      const { data } = await LeaveService.removeLeave(id);
      if (data) {
        toast.success("Leave has been removed Successfully!");
        getEmployee();
      } else {
        toast.error("Leave cannot beremoved!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <h1 className="page-title">View Leave Records</h1>
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
        <button className="btn btn-primary">Get Leave Records</button>
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
      {employee.leaves != null && (
        <table className="table-bordered table-striped w-100 mt-2">
          <thead>
            <tr>
              <th>Id</th>
              <th>Type</th>
              <th>Reasons</th>
              <th>Days</th>
              <th>Absence From Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employee.leaves.map(
              ({ id, type, reasons, days, absenceFrom, status }) => {
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{type}</td>
                    <td>{days}</td>
                    <td>{reasons}</td>
                    <td>{absenceFrom}</td>
                    <td>{status}</td>
                    <td>
                      <button
                        onClick={() => removeLeave(id)}
                        className=" btn btn-danger m-2"
                      >
                        Remove
                      </button>
                      <Link
                        to={`/updateLeave/${id}`}
                        className="btn btn-secondary"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Leaves;
