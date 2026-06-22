
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { getPayrolls } from "../services/payrollService";
import {
  getPayslips,
  generatePayslip,
  downloadPayslip,
  getEmployeePayslips,
} from "../services/payslipService";

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
  generateBtn: {
    padding: "6px 14px",
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  downloadLink: {
    display: "inline-block",
    padding: "6px 14px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    textDecoration: "none",
    transition: "opacity 0.2s",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#6b7280",
    fontSize: "16px",
  },
};

// -------------------- Component --------------------
const Payslips = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user.role;

  const [payrolls, setPayrolls] = useState([]);
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      if (role === "Employee") {
        const res = await getEmployeePayslips(user.employee_id);
        setPayslips(res.data);
        setPayrolls([]);
      } else {
        const [p1, p2] = await Promise.all([getPayrolls(), getPayslips()]);
        setPayrolls(p1.data);
        setPayslips(p2.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div style={styles.container}>
          <h1 style={styles.heading}>
            {role === "Employee" ? "My Payslips" : "Payslip Management"}
          </h1>
          <div style={styles.loading}>Loading payslips…</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          {role === "Employee" ? "My Payslips" : "Payslip Management"}
        </h1>

        {/* ---------- Generate Payslip (Admin/HR/Payroll Officer only) ---------- */}
        {role !== "Employee" && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Generate Payslip</h2>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Employee</th>
                    <th style={styles.th}>Month</th>
                    <th style={styles.th}>Year</th>
                    <th style={styles.th}>Net Salary</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.length > 0 ? (
                    payrolls.map((row, idx) => (
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
                        <td style={styles.td}>{row.payroll_id}</td>
                        <td style={styles.td}>{row.full_name}</td>
                        <td style={styles.td}>{row.payroll_month}</td>
                        <td style={styles.td}>{row.payroll_year}</td>
                        <td style={styles.td}>{row.net_salary}</td>
                        <td style={styles.td}>
                          <button
                            onClick={async () => {
                              await generatePayslip(row.payroll_id);
                              alert("Payslip Generated");
                              loadData();
                            }}
                            style={styles.generateBtn}
                            onMouseEnter={(e) =>
                              (e.target.style.opacity = "0.8")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.opacity = "1")
                            }
                          >
                            Generate
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        style={{ ...styles.td, textAlign: "center", color: "#999" }}
                      >
                        No payrolls available for payslip generation.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------- Payslip List (All roles) ---------- */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>
            {role === "Employee" ? "My Payslips" : "Generated Payslips"}
          </h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Employee</th>
                  <th style={styles.th}>Month</th>
                  <th style={styles.th}>Year</th>
                  <th style={styles.th}>Download</th>
                </tr>
              </thead>
              <tbody>
                {payslips.length > 0 ? (
                  payslips.map((row, idx) => (
                    <tr
                      key={row.payslip_id}
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
                      <td style={styles.td}>{row.payslip_id}</td>
                      <td style={styles.td}>{row.full_name || user.username}</td>
                      <td style={styles.td}>{row.payroll_month}</td>
                      <td style={styles.td}>{row.payroll_year}</td>
                      <td style={styles.td}>
                        <a
                          href={downloadPayslip(row.pdf_path)}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.downloadLink}
                          onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                          onMouseLeave={(e) => (e.target.style.opacity = "1")}
                        >
                          Download PDF
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ ...styles.td, textAlign: "center", color: "#999" }}
                    >
                      No payslips found.
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

export default Payslips;