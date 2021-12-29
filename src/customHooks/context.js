import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import EmployeeService from "../services/EmployeeService";
import { ToastContainer, toast } from "react-toastify";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth"))
  );
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser") || { email: "", role: "" })
  );

  const login = async (user) => {
    const { data } = await AuthService.checkAuth(user);
    await setAuth(data);
    await setAuthUser({ email: user.email, role: user.role });
    localStorage.setItem("isAuth", data);
    localStorage.setItem(
      "authUser",
      JSON.stringify({ email: user.email, role: user.role })
    );
    if (data && user.role === "admin") {
      toast.success("You are successfully logged in!", {
        position: "top-center",
        autoClose: 2000,
      });
      window.location.href = "/admin/dashboard";
    } else if (data && user.role === "employee") {
      const { data } = await EmployeeService.getEmployeeByEmail(authUser);
      localStorage.setItem("employeeId", data.id || 1);
      toast.success("You are successfully logged in!", {
        position: "top-center",
        autoClose: 2000,
      });
      window.location.href = "/user/dashboard";
    } else {
      toast.error("Login failed!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const logout = () => {
    localStorage.setItem("isAuth", false);
    localStorage.setItem("authUser", JSON.stringify({ email: "", role: "" }));
    setAuth(false);
    setAuthUser({ email: "", password: "", role: "" });
    toast.success("You are successfully logged out!", {
      position: "top-center",
      autoClose: 2000,
    });
    localStorage.setItem("employeeId", 0);
  };

  const register = async (user) => {
    const { data } = await EmployeeService.getEmployeeByEmail(user);
    if (!data) {
      toast.success(
        "Account created! Your account will be activated after admin's approval!",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
    } else {
      toast.error("Employee already exists with this email address!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{ authUser, isAuth, setAuth, login, logout, register }}
    >
      {children}
      <ToastContainer position="top-center" autoClose={2000} />
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppContext, AppProvider };
