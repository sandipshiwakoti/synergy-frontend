import { useState } from "react";
import { useGlobalContext } from "../customHooks/context";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "", role: "" });
  const { login } = useGlobalContext();

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <>
      <section className="login-section">
        <div className="login-card">
          <div className="page-title">Login Page</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="emali">Enter email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                className="form-control"
                value={user.password}
                name="password"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Select Role</label>
              <select
                name="role"
                className="form-select form-select-lg mb-3"
                onChange={handleInputChange}
                value={user.role}
              >
                <option value=""></option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login to your account
            </button>
            <Link to="/register" className="btn btn-link text-center w-100">
              Register employee account?
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
