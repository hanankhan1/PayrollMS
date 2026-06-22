import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getUsers,
  getEmployees,
  createUser,
  deleteUser,
  updateUser,
} from "../services/userService";

// -------------------- Consistent style objects --------------------
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
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
  // Edit mode styles
  editInput: {
    padding: "6px 10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
  editSelect: {
    padding: "6px 10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
  saveBtn: {
    padding: "6px 14px",
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    marginRight: "6px",
    transition: "opacity 0.2s",
  },
  cancelBtn: {
    padding: "6px 14px",
    backgroundColor: "#e5e7eb",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  editBtn: {
    padding: "6px 14px",
    backgroundColor: "#3c3b5d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    marginRight: "6px",
    transition: "opacity 0.2s",
  },
  actionCell: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    alignItems: "center",
  },
};

// -------------------- Component --------------------
const Users = () => {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "Employee",
    employee_id: "",
  });

  // Edit states
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({
    username: "",
    password: "",
    role: "",
  });

  const loadData = async () => {
    const usersRes = await getUsers();
    const empRes = await getEmployees();
    setUsers(usersRes.data);
    setEmployees(empRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---- Create user ----
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    alert("User Created Successfully");
    setForm({
      username: "",
      password: "",
      role: "Employee",
      employee_id: "",
    });
    loadData();
  };

  // ---- Edit user ----
  const handleEditClick = (user) => {
    setEditingUserId(user.user_id);
    setEditForm({
      username: user.username,
      password: "",
      role: user.role,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (userId) => {
    if (!editForm.username || !editForm.password || !editForm.role) {
      alert("All fields (username, password, role) are required");
      return;
    }
    try {
      await updateUser(userId, {
        username: editForm.username,
        password: editForm.password,
        role: editForm.role,
      });
      alert("User updated successfully");
      setEditingUserId(null);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  // ---- Delete user ----
  const handleDelete = async (userId) => {
    if (window.confirm("Delete this user?")) {
      await deleteUser(userId);
      loadData();
    }
  };

  // Focus/blur helpers
  const applyFocus = (e) => (e.target.style.borderColor = "#3c3b5d");
  const removeFocus = (e) => (e.target.style.borderColor = "#e0e0e0");

  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>User Management</h1>

        {/* ---------- Create Form ---------- */}
        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={applyFocus}
                onBlur={removeFocus}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={applyFocus}
                onBlur={removeFocus}
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                style={styles.select}
                onFocus={applyFocus}
                onBlur={removeFocus}
              >
                <option value="Employee">Employee</option>
                <option value="HR Officer">HR Officer</option>
                <option value="Payroll Officer">Payroll Officer</option>
                <option value="Admin">Admin</option>
              </select>
              <select
                name="employee_id"
                value={form.employee_id}
                onChange={handleChange}
                required
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
              <button
                type="submit"
                style={styles.primaryBtn}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
                onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
                onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
              >
                Create User
              </button>
            </div>
          </form>
        </div>

        {/* ---------- User Table ---------- */}
        <div style={styles.card}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Username</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Employee</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => {
                  const isEditing = editingUserId === user.user_id;
                  return (
                    <tr
                      key={user.user_id}
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
                      <td style={styles.td}>{user.user_id}</td>

                      {/* Editable Username */}
                      <td style={styles.td}>
                        {isEditing ? (
                          <input
                            type="text"
                            name="username"
                            value={editForm.username}
                            onChange={handleEditChange}
                            style={styles.editInput}
                            required
                          />
                        ) : (
                          user.username
                        )}
                      </td>

                      {/* Editable Role */}
                      <td style={styles.td}>
                        {isEditing ? (
                          <select
                            name="role"
                            value={editForm.role}
                            onChange={handleEditChange}
                            style={styles.editSelect}
                            required
                          >
                            <option value="Employee">Employee</option>
                            <option value="HR Officer">HR Officer</option>
                            <option value="Payroll Officer">Payroll Officer</option>
                            <option value="Admin">Admin</option>
                          </select>
                        ) : (
                          user.role
                        )}
                      </td>

                      <td style={styles.td}>{user.full_name || "—"}</td>

                      {/* Action column */}
                      <td style={styles.td}>
                        {isEditing ? (
                          <div style={styles.actionCell}>
                            <input
                              type="password"
                              name="password"
                              placeholder="New Password"
                              value={editForm.password}
                              onChange={handleEditChange}
                              style={{ ...styles.editInput, minWidth: "120px" }}
                              required
                            />
                            <button
                              onClick={() => handleUpdateSubmit(user.user_id)}
                              style={styles.saveBtn}
                              onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                              onMouseLeave={(e) => (e.target.style.opacity = "1")}
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              style={styles.cancelBtn}
                              onMouseEnter={(e) => (e.target.style.backgroundColor = "#d1d5db")}
                              onMouseLeave={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div style={styles.actionCell}>
                            <button
                              onClick={() => handleEditClick(user)}
                              style={styles.editBtn}
                              onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                              onMouseLeave={(e) => (e.target.style.opacity = "1")}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(user.user_id)}
                              style={styles.deleteBtn}
                              onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                              onMouseLeave={(e) => (e.target.style.opacity = "1")}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ ...styles.td, textAlign: "center", color: "#999" }}
                    >
                      No users found.
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

export default Users;