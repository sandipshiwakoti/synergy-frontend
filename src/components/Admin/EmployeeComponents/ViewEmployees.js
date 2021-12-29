import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../../../services/EmployeeService";

const EmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getEmployees = async () => {
    try {
      const response = await EmployeeService.getEmployees();
      if (response) {
        const { data } = response;
        setEmployees(data);
        setIsLoading(false);
        setIsError(false);
        console.log(data);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  };

  const removeEmployee = async (id) => {
    const data = await EmployeeService.removeEmployee(id);
    getEmployees();
  };

  useEffect(() => {
    getEmployees();
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
      <h1 className="page-title">Employee Records</h1>
      <Link to="/createEmployee" className="btn btn-success">
        Add Employee
      </Link>
      <table className="table table-responsive table-bordered table-striped mt-2">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Nationality</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(
            ({
              id,
              personalInformation: { fullname, email, nationality, mobileNo },
            }) => {
              return (
                <tr key={id}>
                  <td>{fullname}</td>
                  <td>{email}</td>
                  <td>{mobileNo}</td>
                  <td>{nationality}</td>
                  <td>
                    <button
                      onClick={() => removeEmployee(id)}
                      className=" btn btn-danger m-2"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/updateEmployee/${id}`}
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
    </>
  );
};

export default EmployeeComponent;
