import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Admin/AdminDashboard";
import {
  CreateEmployee,
  UpdateEmployee,
  ViewEmployees,
} from "./components/Admin/EmployeeComponents";
import {
  Attendances,
  UpdateAttendance,
} from "./components/Admin/AttendanceComponents";
import { Leaves, UpdateLeave } from "./components/Admin/LeaveComponents";
import { Jobs, UpdateJob } from "./components/Admin/JobComponents";

import UserDashboard from "./components/User/Dashboard";
import { CreateLeave, ViewLeaves } from "./components/User/UserLeaveComponents";
import {
  Information as UserInformation,
  ViewJob as UserViewJob,
} from "./components/User/UserInformationComponents";
import { ClockComponent } from "./components/User/UserAttendanceComponents";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/logout" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <ProtectedRoute
            role="admin"
            path="/admin/dashboard"
            component={Dashboard}
          ></ProtectedRoute>
          <ProtectedRoute
            role="admin"
            path="/createEmployee"
            component={CreateEmployee}
          />
          <ProtectedRoute
            role="admin"
            path="/viewEmployees"
            component={ViewEmployees}
          />
          <ProtectedRoute
            role="admin"
            path="/updateEmployee/:id"
            component={UpdateEmployee}
          />
          <ProtectedRoute
            role="admin"
            path="/attendances"
            component={Attendances}
          ></ProtectedRoute>
          <ProtectedRoute
            role="admin"
            path="/updateAttendance/:id"
            component={UpdateAttendance}
          ></ProtectedRoute>
          <ProtectedRoute role="admin" path="/leaves" component={Leaves} />
          <ProtectedRoute
            role="admin"
            path="/updateLeave/:id"
            component={UpdateLeave}
          ></ProtectedRoute>
          <ProtectedRoute role="admin" path="/jobs" component={Jobs} />
          <Route path="/updateJob/:id" component={UpdateJob}></Route>

          <ProtectedRoute
            role="employee"
            path="/user/dashboard"
            component={UserDashboard}
          />
          <ProtectedRoute
            role="employee"
            path="/user/createLeave"
            component={CreateLeave}
          />
          <ProtectedRoute
            role="employee"
            path="/user/viewLeaves"
            component={ViewLeaves}
          />

          <ProtectedRoute
            role="employee"
            path="/user/information"
            component={UserInformation}
          />
          <ProtectedRoute
            role="employee"
            path="/user/viewJob"
            component={UserViewJob}
          />

          <ProtectedRoute
            role="employee"
            path="/user/attendance"
            component={ClockComponent}
          />
        </Switch>
      </div>
    </>
  );
};

export default App;
