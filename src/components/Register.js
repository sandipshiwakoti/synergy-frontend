import { useState } from "react";
import { useGlobalContext } from "../customHooks/context";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "employee",
    confirmPassword: "",
  });
  const { register } = useGlobalContext();

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, role, confirmPassword } = user;
    if (confirmPassword === password) {
      register({ email, password, role });
    } else {
      toast.error("Confurm password must match");
    }
  };

  return (
    <>
      <section className="login-section">
        <div className="login-card">
          <div className="page-title">Register employee account</div>
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
              <label htmlFor="conirmPassword">Enter Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={user.confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
