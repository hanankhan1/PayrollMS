import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getAttendance } from "../services/selfServiceService";

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
};

// -------------------- Component --------------------
const AttendanceHistory = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const res = await getAttendance(user.employee_id);
      setAttendance(res.data);
    } catch (error) {
      console.error("Failed to load attendance history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Attendance History</h1>

        <div style={styles.card}>
          {loading ? (
            <div style={styles.loading}>Loading attendance records…</div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Check In</th>
                    <th style={styles.th}>Check Out</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.length > 0 ? (
                    attendance.map((row, idx) => (
                      <tr
                        key={row.attendance_id}
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
                          {formatDate(row.attendance_date)}
                        </td>
                        <td style={styles.td}>
                          {row.check_in_time || "—"}
                        </td>
                        <td style={styles.td}>
                          {row.check_out_time || "—"}
                        </td>
                        <td style={styles.td}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "13px",
                              fontWeight: "500",
                              backgroundColor:
                                row.attendance_status === "Present"
                                  ? "#dcfce7"
                                  : row.attendance_status === "Absent"
                                  ? "#fee2e2"
                                  : row.attendance_status === "On Leave"
                                  ? "#fef9c3"
                                  : "#f3f4f6",
                              color:
                                row.attendance_status === "Present"
                                  ? "#166534"
                                  : row.attendance_status === "Absent"
                                  ? "#991b1b"
                                  : row.attendance_status === "On Leave"
                                  ? "#854d0e"
                                  : "#374151",
                            }}
                          >
                            {row.attendance_status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          ...styles.td,
                          textAlign: "center",
                          color: "#999",
                        }}
                      >
                        No attendance records found.
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

export default AttendanceHistory;