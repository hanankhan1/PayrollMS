import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { getEmployees } from "../services/employeeService";
import {
  getStructures,
  addStructure,
  updateStructure,
  deleteStructure,
} from "../services/salaryStructureService";

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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
    width: "100%",
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
    width: "100%",
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
  actionCell: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  editBtn: {
    padding: "6px 14px",
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "opacity 0.2s",
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
const SalaryStructure = () => {
  const [employees, setEmployees] = useState([]);
  const [structures, setStructures] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    employee_id: "",
    house_allowance: 0,
    medical_allowance: 0,
    transport_allowance: 0,
    tax: 0,
    loan_deduction: 0,
    other_deduction: 0,
  });

  const loadData = async () => {
    const emp = await getEmployees();
    const sal = await getStructures();
    setEmployees(emp.data);
    setStructures(sal.data);
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

  const handleSubmit = async () => {
    if (editId) {
      await updateStructure(editId, form);
      alert("Updated Successfully");
    } else {
      await addStructure(form);
      alert("Added Successfully");
    }

    setEditId(null);
    setForm({
      employee_id: "",
      house_allowance: 0,
      medical_allowance: 0,
      transport_allowance: 0,
      tax: 0,
      loan_deduction: 0,
      other_deduction: 0,
    });
    loadData();
  };

  // Focus helpers
  const applyFocus = (e) => (e.target.style.borderColor = "#3c3b5d");
  const removeFocus = (e) => (e.target.style.borderColor = "#e0e0e0");

  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Salary Structure Management</h1>

        {/* ---------- Form Card ---------- */}
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
              name="house_allowance"
              placeholder="House Allowance"
              value={form.house_allowance}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="number"
              name="medical_allowance"
              placeholder="Medical Allowance"
              value={form.medical_allowance}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="number"
              name="transport_allowance"
              placeholder="Transport Allowance"
              value={form.transport_allowance}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="number"
              name="tax"
              placeholder="Tax Deduction"
              value={form.tax}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="number"
              name="loan_deduction"
              placeholder="Loan Deduction"
              value={form.loan_deduction}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="number"
              name="other_deduction"
              placeholder="Other Deduction"
              value={form.other_deduction}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <button
              onClick={handleSubmit}
              style={styles.primaryBtn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {/* ---------- Table Card ---------- */}
        <div style={styles.card}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Employee</th>
                  <th style={styles.th}>House</th>
                  <th style={styles.th}>Medical</th>
                  <th style={styles.th}>Transport</th>
                  <th style={styles.th}>Tax</th>
                  <th style={styles.th}>Loan</th>
                  <th style={styles.th}>Other</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {structures.map((row, idx) => (
                  <tr
                    key={row.structure_id}
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
                    <td style={styles.td}>{row.structure_id}</td>
                    <td style={styles.td}>{row.full_name}</td>
                    <td style={styles.td}>{row.house_allowance}</td>
                    <td style={styles.td}>{row.medical_allowance}</td>
                    <td style={styles.td}>{row.transport_allowance}</td>
                    <td style={styles.td}>{row.tax}</td>
                    <td style={styles.td}>{row.loan_deduction}</td>
                    <td style={styles.td}>{row.other_deduction}</td>
                    <td style={styles.td}>
                      <div style={styles.actionCell}>
                        <button
                          onClick={() => {
                            setEditId(row.structure_id);
                            setForm({
                              employee_id: row.employee_id,
                              house_allowance: row.house_allowance,
                              medical_allowance: row.medical_allowance,
                              transport_allowance: row.transport_allowance,
                              tax: row.tax,
                              loan_deduction: row.loan_deduction,
                              other_deduction: row.other_deduction,
                            });
                          }}
                          style={styles.editBtn}
                          onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                          onMouseLeave={(e) => (e.target.style.opacity = "1")}
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            await deleteStructure(row.structure_id);
                            loadData();
                          }}
                          style={styles.deleteBtn}
                          onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                          onMouseLeave={(e) => (e.target.style.opacity = "1")}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {structures.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      style={{ ...styles.td, textAlign: "center", color: "#999" }}
                    >
                      No salary structures found.
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

export default SalaryStructure;