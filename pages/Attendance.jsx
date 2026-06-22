
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} from "../services/attendanceService";
import { getEmployees } from "../services/employeeService";

// -------------------- Style object --------------------
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
  formRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    alignItems: "center",
    marginBottom: "16px",
  },
  input: {
    padding: "10px 14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    minWidth: "140px",
    flex: "1 1 auto",
    backgroundColor: "#fafafa",
    transition: "border-color 0.2s",
    outline: "none",
  },
  select: {
    padding: "10px 14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    minWidth: "160px",
    flex: "1 1 auto",
    backgroundColor: "#fafafa",
    transition: "border-color 0.2s",
    outline: "none",
    cursor: "pointer",
  },
  submitBtn: {
    padding: "10px 24px",
    backgroundColor: "#3c3b5d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.1s",
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
    borderBottom: "2px solid #e0e0e0",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #f0f0f0",
    textAlign: "left",
  },
  actionBtn: {
    padding: "6px 14px",
    marginRight: "8px",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  editBtn: {
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
  },
  deleteBtn: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
};

// -------------------- Component --------------------
const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    employee_id: "",
    attendance_date: "",
    check_in_time: "",
    check_out_time: "",
    attendance_status: "Present",
  });

  const loadAttendance = async () => {
    const res = await getAttendance();
    setRecords(res.data);
  };

  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadAttendance();
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateAttendance(editId, form);
      alert("Attendance Updated");
    } else {
      await addAttendance(form);
      alert("Attendance Recorded");
    }
    setEditId(null);
    setForm({
      employee_id: "",
      attendance_date: "",
      check_in_time: "",
      check_out_time: "",
      attendance_status: "Present",
    });
    loadAttendance();
  };

  // Helper to apply hover effects via inline event handlers (optional)
  // For simplicity, we use CSS pseudo‑classes in a <style> tag.
  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Attendance Management</h1>

        {/* ---------- Form Card ---------- */}
        <div style={styles.card}>
          <div style={styles.formRow}>
            <select
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              style={styles.select}
              onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="attendance_date"
              value={form.attendance_date}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />

            <input
              type="time"
              name="check_in_time"
              value={form.check_in_time}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />

            <input
              type="time"
              name="check_out_time"
              value={form.check_out_time}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />

            <select
              name="attendance_status"
              value={form.attendance_status}
              onChange={handleChange}
              style={styles.select}
              onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            >
              <option>Present</option>
              <option>Absent</option>
              <option>On Leave</option>
            </select>

            <button
              onClick={handleSubmit}
              style={styles.submitBtn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#4338ca")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#4f46e5")
              }
              onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              {editId ? "Update" : "Record"}
            </button>
          </div>
        </div>

        {/* ---------- Table ---------- */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Employee</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Check In</th>
                <th style={styles.th}>Check Out</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, idx) => (
                <tr
                  key={row.attendance_id}
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
                  <td style={styles.td}>{row.attendance_id}</td>
                  <td style={styles.td}>{row.full_name}</td>
                  <td style={styles.td}>{row.attendance_date}</td>
                  <td style={styles.td}>{row.check_in_time}</td>
                  <td style={styles.td}>{row.check_out_time}</td>
                  <td style={styles.td}>{row.attendance_status}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => {
                        setEditId(row.attendance_id);
                        setForm({
                          employee_id: row.employee_id,
                          attendance_date: row.attendance_date,
                          check_in_time: row.check_in_time,
                          check_out_time: row.check_out_time,
                          attendance_status: row.attendance_status,
                        });
                      }}
                      style={{ ...styles.actionBtn, ...styles.editBtn }}
                      onMouseEnter={(e) =>
                        (e.target.style.opacity = "0.8")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.opacity = "1")
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        await deleteAttendance(row.attendance_id);
                        loadAttendance();
                      }}
                      style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                      onMouseEnter={(e) =>
                        (e.target.style.opacity = "0.8")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.opacity = "1")
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ ...styles.td, textAlign: "center", color: "#999" }}>
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Attendance;