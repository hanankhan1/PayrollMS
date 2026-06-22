import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getPayrollSummary,
  getDepartmentSalary,
  getAttendanceReport,
} from "../services/reportService";

// -------------------- Style objects --------------------
const styles = {
  container: {
    padding: "24px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "24px",
    color: "#1a1a2e",
  },
  card: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#2c3e50",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    background: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  th: {
    padding: "14px 16px",
    backgroundColor: "#3c3b5d",
    color: "#ffffff",
    textAlign: "left",
    fontWeight: "600",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #f0f0f0",
    textAlign: "left",
  },
};

// -------------------- Component --------------------
const Reports = () => {
  const [payrollSummary, setPayrollSummary] = useState([]);
  const [departmentSalary, setDepartmentSalary] = useState([]);
  const [attendanceReport, setAttendanceReport] = useState([]);

  const loadReports = async () => {
    const payroll = await getPayrollSummary();
    const dept = await getDepartmentSalary();
    const attendance = await getAttendanceReport();

    setPayrollSummary(payroll.data);
    setDepartmentSalary(dept.data);
    setAttendanceReport(attendance.data);
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Reports Dashboard</h1>

        {/* ---------- Payroll Summary ---------- */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Payroll Summary</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Employee</th>
                  <th style={styles.th}>Month</th>
                  <th style={styles.th}>Year</th>
                  <th style={styles.th}>Gross</th>
                  <th style={styles.th}>Net</th>
                </tr>
              </thead>
              <tbody>
                {payrollSummary.map((row, idx) => (
                  <tr
                    key={row.payroll_id}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#f9fafb" : "#ffffff",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f4ff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        idx % 2 === 0 ? "#f9fafb" : "#ffffff")
                    }
                  >
                    <td style={styles.td}>{row.full_name}</td>
                    <td style={styles.td}>{row.payroll_month}</td>
                    <td style={styles.td}>{row.payroll_year}</td>
                    <td style={styles.td}>{row.gross_salary}</td>
                    <td style={styles.td}>{row.net_salary}</td>
                  </tr>
                ))}
                {payrollSummary.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ ...styles.td, textAlign: "center", color: "#999" }}
                    >
                      No payroll summary data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- Department Salary Report ---------- */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Department Salary Report</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Employees</th>
                  <th style={styles.th}>Total Salary</th>
                </tr>
              </thead>
              <tbody>
                {departmentSalary.map((row, idx) => (
                  <tr
                    key={row.department_name}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#f9fafb" : "#ffffff",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f4ff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        idx % 2 === 0 ? "#f9fafb" : "#ffffff")
                    }
                  >
                    <td style={styles.td}>{row.department_name}</td>
                    <td style={styles.td}>{row.total_employees}</td>
                    <td style={styles.td}>{row.total_salary_paid}</td>
                  </tr>
                ))}
                {departmentSalary.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      style={{ ...styles.td, textAlign: "center", color: "#999" }}
                    >
                      No department salary data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- Attendance Report ---------- */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Attendance Report</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Employee</th>
                  <th style={styles.th}>Present</th>
                  <th style={styles.th}>Absent</th>
                  <th style={styles.th}>Leave</th>
                </tr>
              </thead>
              <tbody>
                {attendanceReport.map((row, idx) => (
                  <tr
                    key={row.full_name}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#f9fafb" : "#ffffff",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f4ff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        idx % 2 === 0 ? "#f9fafb" : "#ffffff")
                    }
                  >
                    <td style={styles.td}>{row.full_name}</td>
                    <td style={styles.td}>{row.present_days}</td>
                    <td style={styles.td}>{row.absent_days}</td>
                    <td style={styles.td}>{row.leave_days}</td>
                  </tr>
                ))}
                {attendanceReport.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      style={{ ...styles.td, textAlign: "center", color: "#999" }}
                    >
                      No attendance report data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;