import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getPayroll } from "../services/selfServiceService";

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
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#6b7280",
    fontSize: "16px",
  },
  monthBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
  },
};

// -------------------- Helper to get month name --------------------
const getMonthName = (monthNumber) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return months[monthNumber - 1] || monthNumber;
};

// -------------------- Component --------------------
const PayrollHistory = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    setLoading(true);
    try {
      const res = await getPayroll(user.employee_id);
      setPayroll(res.data);
    } catch (error) {
      console.error("Failed to load payroll history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Payroll History</h1>

        <div style={styles.card}>
          {loading ? (
            <div style={styles.loading}>Loading payroll records…</div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Month</th>
                    <th style={styles.th}>Year</th>
                    <th style={styles.th}>Gross Salary</th>
                    <th style={styles.th}>Net Salary</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payroll.length > 0 ? (
                    payroll.map((row, idx) => (
                      <tr
                        key={row.payroll_id}
                        style={{
                          backgroundColor:
                            idx % 2 === 0 ? "#f9fafb" : "#ffffff",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f0f4ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            idx % 2 === 0 ? "#f9fafb" : "#ffffff")
                        }
                      >
                        <td style={styles.td}>
                          <span
                            style={{
                              ...styles.monthBadge,
                              backgroundColor: "#e0e7ff",
                              color: "#3c3b5d",
                            }}
                          >
                            {getMonthName(row.payroll_month)}
                          </span>
                        </td>
                        <td style={styles.td}>{row.payroll_year}</td>
                        <td style={styles.td}>{row.gross_salary}</td>
                        <td style={styles.td}>{row.net_salary}</td>
                        <td style={styles.td}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "13px",
                              fontWeight: "500",
                              backgroundColor: row.net_salary > 0 ? "#dcfce7" : "#fee2e2",
                              color: row.net_salary > 0 ? "#166534" : "#991b1b",
                            }}
                          >
                            {row.net_salary > 0 ? "Paid" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          ...styles.td,
                          textAlign: "center",
                          color: "#999",
                        }}
                      >
                        No payroll records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PayrollHistory;