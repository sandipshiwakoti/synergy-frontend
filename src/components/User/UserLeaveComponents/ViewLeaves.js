import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../../../services/EmployeeService";

export default function ViewLeave() {
  const employeeId = Number(localStorage.getItem("employeeId"));
  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const getAndSetEmployee = async () => {
    try {
      const { data } = await EmployeeService.getEmployee(employeeId);
      if (data) {
        setEmployee(data);
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
    getAndSetEmployee();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    <>
      <h1 className="page-title">View Leave </h1>
      <Link to="/user/dashboard" className="btn btn-primary">
        Back to Dashboard
      </Link>
      <h1 className="page-subtitle">Leave Records</h1>

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
            </tr>
          </thead>
          <tbody>
            {employee.leaves.map(
              ({ id, type, reasons, days, absenceFrom, status }) => {
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{type}</td>
                    <td>{reasons}</td>
                    <td>{days}</td>
                    <td>{absenceFrom}</td>
                    <td>{status}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </>
  );
}
