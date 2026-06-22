import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Attendance from "./pages/Attendance";
import SalaryStructure from "./pages/SalaryStructure";
import Payroll from "./pages/Payroll";
import Payslips from "./pages/Payslips";
import Reports from "./pages/Reports";

import Profile from "./pages/Profile";
import AttendanceHistory from "./pages/AttendanceHistory";
import PayrollHistory from "./pages/PayrollHistory";

import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";
function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Employee Management */}

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        {/* User Management */}
        <Route
path="/users"
element={
<ProtectedRoute>
<Users />
</ProtectedRoute>
}
/>

        {/* Department Management */}

        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          }
        />

        {/* Attendance */}

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        {/* Salary Structure */}

        <Route
          path="/salary-structure"
          element={
            <ProtectedRoute>
              <SalaryStructure />
            </ProtectedRoute>
          }
        />

        {/* Payroll */}

        <Route
          path="/payroll"
          element={
            <ProtectedRoute>
              <Payroll />
            </ProtectedRoute>
          }
        />

        {/* Payslips */}

        <Route
          path="/payslips"
          element={
            <ProtectedRoute>
              <Payslips />
            </ProtectedRoute>
          }
        />

        {/* Reports */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Employee Portal */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance-history"
          element={
            <ProtectedRoute>
              <AttendanceHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payroll-history"
          element={
            <ProtectedRoute>
              <PayrollHistory />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;