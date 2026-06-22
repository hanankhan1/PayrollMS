
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  searchDepartment,
} from "../services/departmentService";

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
  formRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "center",
    marginBottom: "16px",
  },
  input: {
    padding: "10px 14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    minWidth: "200px",
    flex: "1 1 auto",
    backgroundColor: "#fafafa",
    outline: "none",
    transition: "border-color 0.2s",
  },
  searchRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "center",
  },
  searchInput: {
    padding: "10px 14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    flex: "1 1 250px",
    backgroundColor: "#fafafa",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#3c3b5d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
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
const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    department_name: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);

  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateDepartment(editId, form);
      alert("Department Updated");
    } else {
      await addDepartment(form);
      alert("Department Added");
    }

    setForm({
      department_name: "",
      description: "",
    });
    setEditId(null);
    loadDepartments();
  };

  const handleEdit = (dep) => {
    setEditId(dep.department_id);
    setForm({
      department_name: dep.department_name,
      description: dep.description,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete Department?")) {
      await deleteDepartment(id);
      loadDepartments();
    }
  };

  const handleSearch = async () => {
    if (search === "") {
      loadDepartments();
      return;
    }
    const res = await searchDepartment(search);
    setDepartments(res.data);
  };

  // Focus effect handlers
  const applyFocus = (e) => (e.target.style.borderColor = "#3c3b5d");
  const removeFocus = (e) => (e.target.style.borderColor = "#e0e0e0");

  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Department Management</h1>

        {/* ---------- Form Card ---------- */}
        <div style={styles.card}>
          <div style={styles.formRow}>
            <input
              type="text"
              name="department_name"
              placeholder="Department Name"
              value={form.department_name}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              style={styles.input}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <button
              onClick={handleSubmit}
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {/* ---------- Search Card ---------- */}
        <div style={styles.card}>
          <div style={styles.searchRow}>
            <input
              type="text"
              placeholder="Search Department"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              onFocus={applyFocus}
              onBlur={removeFocus}
            />
            <button
              onClick={handleSearch}
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
            >
              Search
            </button>
          </div>
        </div>

        {/* ---------- Table ---------- */}
        <div style={styles.card}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dep, idx) => (
                  <tr
                    key={dep.department_id}
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
                    <td style={styles.td}>{dep.department_id}</td>
                    <td style={styles.td}>{dep.department_name}</td>
                    <td style={styles.td}>{dep.description}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleEdit(dep)}
                        style={{ ...styles.actionBtn, ...styles.editBtn }}
                        onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                        onMouseLeave={(e) => (e.target.style.opacity = "1")}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dep.department_id)}
                        style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                        onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                        onMouseLeave={(e) => (e.target.style.opacity = "1")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {departments.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        ...styles.td,
                        textAlign: "center",
                        color: "#999",
                      }}
                    >
                      No departments found.
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

export default Departments;