import { Link } from "react-router-dom";
import logo from "../logo.png";
import { useGlobalContext } from "../customHooks/context";

const Navbar = () => {
  const { logout, isAuth, authUser } = useGlobalContext();
  return (
    <>
      <section className="nav-section container-fluid">
        <nav className="nav">
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
          </div>
          {isAuth && (
            <div className="nav-bottom container">
              <Link
                to={
                  isAuth &&
                  `/${authUser.role === "admin" ? "admin" : "user"}/dashboard`
                }
                className="btn btn-success"
              >
                Dashboard
              </Link>
              <div>
                <span className="welcome-message">
                  Welcome <b>{authUser.email}!</b>
                </span>
                <button className="btn btn-primary" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>
      </section>
    </>
  );
};

export default Navbar;
