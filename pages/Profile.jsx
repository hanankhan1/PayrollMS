import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getProfile } from "../services/selfServiceService";

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
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    maxWidth: "700px",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "32px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "24px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#3c3b5d",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "600",
    flexShrink: 0,
  },
  name: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1a1a2e",
    margin: "0 0 4px 0",
  },
  designation: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  value: {
    fontSize: "15px",
    color: "#333",
    fontWeight: "500",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px",
    color: "#6b7280",
    fontSize: "16px",
  },
};

// -------------------- Component --------------------
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfile(user.employee_id);
      setProfile(res.data);
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get initials for avatar from full name
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <MainLayout>
        <div style={styles.container}>
          <h1 style={styles.heading}>My Profile</h1>
          <div style={styles.loading}>Loading profile…</div>
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div style={styles.container}>
          <h1 style={styles.heading}>My Profile</h1>
          <div style={styles.loading}>Unable to load profile.</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>My Profile</h1>
        <div style={styles.card}>
          {/* Avatar + Name & Designation */}
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              {getInitials(profile.full_name)}
            </div>
            <div>
              <h2 style={styles.name}>{profile.full_name || "—"}</h2>
              <p style={styles.designation}>
                {profile.designation || "No designation"}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.label}>CNIC</span>
              <span style={styles.value}>{profile.cnic || "—"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Email</span>
              <span style={styles.value}>{profile.email || "—"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Phone</span>
              <span style={styles.value}>{profile.phone || "—"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Department</span>
              <span style={styles.value}>{profile.department_name || "—"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Joining Date</span>
              <span style={styles.value}>
                {profile.joining_date
                  ? new Date(profile.joining_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;