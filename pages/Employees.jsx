import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
} from "../services/employeeService";
import { getDepartments } from "../services/departmentService";

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
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: "1 1 250px",
    padding: "10px 14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#fafafa",
    outline: "none",
  },
  searchBtn: {
    padding: "10px 20px",
    backgroundColor: "#3c3b5d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#2c3e50",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px 14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#fafafa",
    outline: "none",
    transition: "border-color 0.2s",
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
  },
  formActions: {
    display: "flex",
    gap: "12px",
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
    transition: "background-color 0.2s",
  },
  clearBtn: {
    padding: "10px 24px",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    background: "#fff",
    marginTop: "8px",
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
    color: "#3c3b5d",
  },
  deleteBtn: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
};

// -------------------- Component --------------------
const Employees = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    cnic: "",
    email: "",
    phone: "",
    department_id: "",
    designation: "",
    joining_date: "",
    basic_salary: "",
    bank_account_number: "",
    status: "Active",
  });

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm({
      full_name: "",
      cnic: "",
      email: "",
      phone: "",
      department_id: "",
      designation: "",
      joining_date: "",
      basic_salary: "",
      bank_account_number: "",
      status: "Active",
    });
    setEditId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateEmployee(editId, form);
        alert("Employee Updated Successfully");
      } else {
        await addEmployee(form);
        alert("Employee Added Successfully");
      }
      clearForm();
      loadEmployees();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation Failed");
    }
  };

  const handleEdit = (employee) => {
    setEditId(employee.employee_id);
    setForm({
      full_name: employee.full_name,
      cnic: employee.cnic,
      email: employee.email,
      phone: employee.phone,
      department_id: employee.department_id,
      designation: employee.designation,
      joining_date: employee.joining_date?.split("T")[0],
      basic_salary: employee.basic_salary,
      bank_account_number: employee.bank_account_number,
      status: employee.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    if (search === "") {
      loadEmployees();
      return;
    }
    try {
      const res = await searchEmployee(search);
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Helper for focus effects
  const applyFocus = (e) => (e.target.style.borderColor = "#3c3b5d");
  const removeFocus = (e) => (e.target.style.borderColor = "#e0e0e0");

  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Employee Management</h1>

        {/* ---------- Search Card ---------- */}
        <div style={styles.card}>
          <div style={styles.searchRow}>
            <input
              type="text"
              placeholder="Search Employee by name, CNIC, email, etc."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <button
              onClick={handleSearch}
              style={styles.searchBtn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
            >
              Search
            </button>
          </div>
        </div>

        {/* ---------- Form Card ---------- */}
        <div style={styles.card}>
          <h2 style={styles.formTitle}>
            {editId ? "Update Employee" : "Add Employee"}
          </h2>
          <div style={styles.formGrid}>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="text"
              name="cnic"
              placeholder="CNIC"
              value={form.cnic}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <select
              name="department_id"
              value={form.department_id}
              onChange={handleChange}
              style={styles.select}
              onFocus={applyFocus}
              onBlur={removeFocus}
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep.department_id} value={dep.department_id}>
                  {dep.department_name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={form.designation}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="date"
              name="joining_date"
              value={form.joining_date}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="number"
              name="basic_salary"
              placeholder="Basic Salary"
              value={form.basic_salary}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="text"
              name="bank_account_number"
              placeholder="Bank Account Number"
              value={form.bank_account_number}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={styles.select}
              onFocus={applyFocus}
              onBlur={removeFocus}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div style={styles.formActions}>
            <button
              onClick={handleSubmit}
              style={styles.submitBtn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
            >
              {editId ? "Update Employee" : "Add Employee"}
            </button>
            <button
              onClick={clearForm}
              style={styles.clearBtn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
            >
              Clear
            </button>
          </div>
        </div>

        {/* ---------- Table Card ---------- */}
        <div style={styles.card}>
          <h2 style={styles.formTitle}>Employee Records</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>CNIC</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Designation</th>
                  <th style={styles.th}>Salary</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => (
                  <tr
                    key={emp.employee_id}
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
                    <td style={styles.td}>{emp.employee_id}</td>
                    <td style={styles.td}>{emp.full_name}</td>
                    <td style={styles.td}>{emp.cnic}</td>
                    <td style={styles.td}>{emp.department_name}</td>
                    <td style={styles.td}>{emp.designation}</td>
                    <td style={styles.td}>{emp.basic_salary}</td>
                    <td style={styles.td}>{emp.status}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleEdit(emp)}
                        style={{ ...styles.actionBtn, ...styles.editBtn }}
                        onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                        onMouseLeave={(e) => (e.target.style.opacity = "1")}
                      >
                        Edit
                      </button>
                      {role === "Admin" && (
                        <button
                          onClick={() => handleDelete(emp.employee_id)}
                          style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                          onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                          onMouseLeave={(e) => (e.target.style.opacity = "1")}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      style={{ ...styles.td, textAlign: "center", color: "#999" }}
                    >
                      No employee records found.
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

export default Employees;