import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { getEmployees } from "../services/employeeService";
import { getPayrolls, generatePayroll, deletePayroll } from "../services/payrollService";

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
  formGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    alignItems: "end",
  },
  input: {
    padding: "10px 14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#fafafa",
    outline: "none",
    transition: "border-color 0.2s",
    minWidth: "150px",
    boxSizing: "border-box",
  },
  select: {
    padding: "10px 14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#fafafa",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.2s",
    minWidth: "200px",
    boxSizing: "border-box",
  },
  primaryBtn: {
    padding: "10px 24px",
    backgroundColor: "#3c3b5d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.1s",
    whiteSpace: "nowrap",
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
  deleteBtn: {
    padding: "6px 14px",
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
};

// -------------------- Component --------------------
const Payroll = () => {
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    payroll_month: "",
    payroll_year: "",
  });

  const loadData = async () => {
    const emp = await getEmployees();
    const pay = await getPayrolls();
    setEmployees(emp.data);
    setPayrolls(pay.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    const res = await generatePayroll(form);
    alert("Payroll Generated");
    console.log(res.data);
    loadData();
  };

  // Focus helpers
  const applyFocus = (e) => (e.target.style.borderColor = "#3c3b5d");
  const removeFocus = (e) => (e.target.style.borderColor = "#e0e0e0");

  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Payroll Processing</h1>

        {/* ---------- Generate Form ---------- */}
        <div style={styles.card}>
          <div style={styles.formGrid}>
            <select
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              style={styles.select}
              onFocus={applyFocus}
              onBlur={removeFocus}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="payroll_month"
              placeholder="Month (1-12)"
              value={form.payroll_month}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />

            <input
              type="number"
              name="payroll_year"
              placeholder="Year (e.g. 2026)"
              value={form.payroll_year}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />

            <button
              onClick={handleGenerate}
              style={styles.primaryBtn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              Generate Payroll
            </button>
          </div>
        </div>

        {/* ---------- Payroll Table ---------- */}
        <div style={styles.card}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Employee</th>
                  <th style={styles.th}>Month</th>
                  <th style={styles.th}>Year</th>
                  <th style={styles.th}>Gross</th>
                  <th style={styles.th}>Net</th>
                  <th style={styles.th}>Absent</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((row, idx) => (
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
                    <td style={styles.td}>{row.gross_salary}</td>
                    <td style={styles.td}>{row.net_salary}</td>
                    <td style={styles.td}>{row.absent_days}</td>
                    <td style={styles.td}>
                      <button
                        onClick={async () => {
                          await deletePayroll(row.payroll_id);
                          loadData();
                        }}
                        style={styles.deleteBtn}
                        onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                        onMouseLeave={(e) => (e.target.style.opacity = "1")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {payrolls.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      style={{ ...styles.td, textAlign: "center", color: "#999" }}
                    >
                      No payroll records found.
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

export default Payroll;