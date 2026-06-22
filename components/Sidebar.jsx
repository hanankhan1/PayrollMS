// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// import {
//   FaHome,
//   FaUsers,
//   FaBuilding,
//   FaClipboardCheck,
//   FaMoneyBillWave,
//   FaFileInvoiceDollar,
//   FaChartBar,
//   FaUser,
//   FaSignOutAlt
// } from "react-icons/fa";

// const Sidebar = () => {

//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   const role = user?.role;

//   const logout = () => {

//     localStorage.removeItem("user");

//     navigate("/");
//   };

//   const activeStyle = ({ isActive }) => ({
//     background: isActive ? "#2563eb" : "transparent",
//     color: "#fff",
//     textDecoration: "none",
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     padding: "14px 20px",
//     borderRadius: "8px",
//     margin: "5px 10px"
//   });

//   return (
//     <div
//       style={{
//         width: "260px",
//         height: "100vh",
//         background: "#111827",
//         color: "#fff",
//         position: "fixed",
//         left: 0,
//         top: 0,
//         overflowY: "auto"
//       }}
//     >
//       {/* Logo */}
//       <div
//         style={{
//           padding: "25px",
//           textAlign: "center",
//           borderBottom: "1px solid #374151"
//         }}
//       >
//         <h2 style={{ margin: 0 }}>
//           Payroll ERP
//         </h2>

//         <small>
//           {role}
//         </small>
//       </div>

//       {/* Menu */}
//       <div
//         style={{
//           paddingTop: "15px"
//         }}
//       >

//         {/* ADMIN */}

//         {role === "Admin" && (
//           <>
//             <NavLink
//               to="/dashboard"
//               style={activeStyle}
//             >
//               <FaHome />
//               Dashboard
//             </NavLink>

//             <NavLink
//               to="/employees"
//               style={activeStyle}
//             >
//               <FaUsers />
//               Employees
//             </NavLink>

//             <NavLink
//               to="/departments"
//               style={activeStyle}
//             >
//               <FaBuilding />
//               Departments
//             </NavLink>

//             <NavLink
//               to="/attendance"
//               style={activeStyle}
//             >
//               <FaClipboardCheck />
//               Attendance
//             </NavLink>

//             <NavLink
//               to="/salary-structure"
//               style={activeStyle}
//             >
//               <FaMoneyBillWave />
//               Salary Structure
//             </NavLink>

//             <NavLink
//               to="/payroll"
//               style={activeStyle}
//             >
//               <FaMoneyBillWave />
//               Payroll
//             </NavLink>

//             <NavLink
//               to="/payslips"
//               style={activeStyle}
//             >
//               <FaFileInvoiceDollar />
//               Payslips
//             </NavLink>

//             <NavLink
//               to="/reports"
//               style={activeStyle}
//             >
//               <FaChartBar />
//               Reports
//             </NavLink>
//           </>
//         )}

//         {/* HR OFFICER */}

//         {role === "HR Officer" && (
//           <>
//             <NavLink
//               to="/dashboard"
//               style={activeStyle}
//             >
//               <FaHome />
//               Dashboard
//             </NavLink>

//             <NavLink
//               to="/employees"
//               style={activeStyle}
//             >
//               <FaUsers />
//               Employees
//             </NavLink>

//             <NavLink
//               to="/attendance"
//               style={activeStyle}
//             >
//               <FaClipboardCheck />
//               Attendance
//             </NavLink>
//           </>
//         )}

//         {/* PAYROLL OFFICER */}

//         {role === "Payroll Officer" && (
//           <>
//             <NavLink
//               to="/dashboard"
//               style={activeStyle}
//             >
//               <FaHome />
//               Dashboard
//             </NavLink>

//             <NavLink
//               to="/salary-structure"
//               style={activeStyle}
//             >
//               <FaMoneyBillWave />
//               Salary Structure
//             </NavLink>

//             <NavLink
//               to="/payroll"
//               style={activeStyle}
//             >
//               <FaMoneyBillWave />
//               Payroll
//             </NavLink>

//             <NavLink
//               to="/payslips"
//               style={activeStyle}
//             >
//               <FaFileInvoiceDollar />
//               Payslips
//             </NavLink>

//             <NavLink
//               to="/reports"
//               style={activeStyle}
//             >
//               <FaChartBar />
//               Reports
//             </NavLink>
//           </>
//         )}

//         {/* EMPLOYEE */}

//         {role === "Employee" && (
//           <>
//             <NavLink
//               to="/dashboard"
//               style={activeStyle}
//             >
//               <FaHome />
//               Dashboard
//             </NavLink>

//             <NavLink
//               to="/profile"
//               style={activeStyle}
//             >
//               <FaUser />
//               My Profile
//             </NavLink>

//             <NavLink
//               to="/attendance-history"
//               style={activeStyle}
//             >
//               <FaClipboardCheck />
//               Attendance History
//             </NavLink>

//             <NavLink
//               to="/payroll-history"
//               style={activeStyle}
//             >
//               <FaMoneyBillWave />
//               Payroll History
//             </NavLink>

//             <NavLink
//               to="/payslips"
//               style={activeStyle}
//             >
//               <FaFileInvoiceDollar />
//               Payslips
//             </NavLink>
//           </>
//         )}

//       </div>

//       {/* Logout */}

//       <div
//         style={{
//           position: "absolute",
//           bottom: "20px",
//           width: "100%"
//         }}
//       >
//         <button
//           onClick={logout}
//           style={{
//             width: "90%",
//             marginLeft: "5%",
//             padding: "12px",
//             background: "#dc2626",
//             color: "#fff",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "10px"
//           }}
//         >
//           <FaSignOutAlt />
//           Logout
//         </button>
//       </div>

//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

// -------------------- Style helpers --------------------
const sidebarStyle = {
  width: "260px",
  height: "100vh",
  background: "#111827",
  color: "#fff",
  position: "fixed",
  left: 0,
  top: 0,
  display: "flex",
  flexDirection: "column",
  boxShadow: "4px 0 20px rgba(0, 0, 0, 0.3)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const logoContainer = {
  padding: "28px 20px",
  textAlign: "center",
  borderBottom: "1px solid #374151",
  flexShrink: 0,
};

const menuContainer = {
  flex: 1,
  overflowY: "auto",
  padding: "15px 0",
  // Hide scrollbar for cleaner look (optional)
  scrollbarWidth: "thin",
  scrollbarColor: "#4b5563 transparent",
};

const logoutContainer = {
  padding: "20px",
  borderTop: "1px solid #374151",
  flexShrink: 0,
};

const linkStyle = ({ isActive }) => ({
  background: isActive ? "#2563eb" : "transparent",
  color: "#fff",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 20px",
  margin: "4px 12px",
  borderRadius: "8px",
  fontWeight: "500",
  fontSize: "14px",
  transition: "background 0.2s",
});

const logoutBtnStyle = {
  width: "100%",
  padding: "12px",
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontWeight: "600",
  fontSize: "14px",
  transition: "background 0.2s",
};

// -------------------- Component --------------------
const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo / user info */}
      <div style={logoContainer}>
        <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700" }}>
          Payroll ERP
        </h2>
        <small style={{ color: "#9ca3af", fontSize: "12px" }}>{role}</small>
      </div>

      {/* Scrollable menu */}
      <div style={menuContainer}>
        {/* ADMIN */}
        {role === "Admin" && (
          <>
            <NavLink to="/dashboard" style={linkStyle}>
              <FaHome /> Dashboard
            </NavLink>
            <NavLink to="/employees" style={linkStyle}>
              <FaUsers /> Employees
            </NavLink>
            <NavLink
to="/users"
style={linkStyle}
>
<FaUsers />
Users
</NavLink>
            <NavLink to="/departments" style={linkStyle}>
              <FaBuilding /> Departments
            </NavLink>
            <NavLink to="/attendance" style={linkStyle}>
              <FaClipboardCheck /> Attendance
            </NavLink>
            <NavLink to="/salary-structure" style={linkStyle}>
              <FaMoneyBillWave /> Salary Structure
            </NavLink>
            <NavLink to="/payroll" style={linkStyle}>
              <FaMoneyBillWave /> Payroll
            </NavLink>
            <NavLink to="/payslips" style={linkStyle}>
              <FaFileInvoiceDollar /> Payslips
            </NavLink>
            <NavLink to="/reports" style={linkStyle}>
              <FaChartBar /> Reports
            </NavLink>
          </>
        )}

        {/* HR OFFICER */}
        {role === "HR Officer" && (
          <>
            <NavLink to="/dashboard" style={linkStyle}>
              <FaHome /> Dashboard
            </NavLink>
            <NavLink to="/employees" style={linkStyle}>
              <FaUsers /> Employees
            </NavLink>
            <NavLink to="/attendance" style={linkStyle}>
              <FaClipboardCheck /> Attendance
            </NavLink>
          </>
        )}

        {/* PAYROLL OFFICER */}
        {role === "Payroll Officer" && (
          <>
            <NavLink to="/dashboard" style={linkStyle}>
              <FaHome /> Dashboard
            </NavLink>
            <NavLink to="/salary-structure" style={linkStyle}>
              <FaMoneyBillWave /> Salary Structure
            </NavLink>
            <NavLink to="/payroll" style={linkStyle}>
              <FaMoneyBillWave /> Payroll
            </NavLink>
            <NavLink to="/payslips" style={linkStyle}>
              <FaFileInvoiceDollar /> Payslips
            </NavLink>
            <NavLink to="/reports" style={linkStyle}>
              <FaChartBar /> Reports
            </NavLink>
          </>
        )}

        {/* EMPLOYEE */}
        {role === "Employee" && (
          <>
            <NavLink to="/dashboard" style={linkStyle}>
              <FaHome /> Dashboard
            </NavLink>
            <NavLink to="/profile" style={linkStyle}>
              <FaUser /> My Profile
            </NavLink>
            <NavLink to="/attendance-history" style={linkStyle}>
              <FaClipboardCheck /> Attendance History
            </NavLink>
            <NavLink to="/payroll-history" style={linkStyle}>
              <FaMoneyBillWave /> Payroll History
            </NavLink>
            <NavLink to="/payslips" style={linkStyle}>
              <FaFileInvoiceDollar /> Payslips
            </NavLink>
          </>
        )}
      </div>

      {/* Logout – always visible at bottom */}
      <div style={logoutContainer}>
        <button
          onClick={logout}
          style={logoutBtnStyle}
          onMouseEnter={(e) => (e.target.style.background = "#b91c1c")}
          onMouseLeave={(e) => (e.target.style.background = "#dc2626")}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;