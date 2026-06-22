// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../services/authService";

// const Register = () => {

//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         username:"",
//         password:"",
//         role:"Employee"
//     });

//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]:e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try{

//             await registerUser(formData);

//             alert("User Registered");

//             navigate("/");

//         }catch(error){

//             alert(
//                 error.response?.data?.message ||
//                 "Registration Failed"
//             );
//         }
//     };

//     return (

//         <div style={{
//             display:'flex',
//             justifyContent:'center',
//             alignItems:'center',
//             height:'100vh'
//         }}>

//             <div style={{
//                 width:'400px',
//                 background:'white',
//                 padding:'30px',
//                 borderRadius:'10px',
//                 boxShadow:'0 0 10px rgba(0,0,0,.2)'
//             }}>

//                 <h2>Register User</h2>

//                 <form onSubmit={handleSubmit}>

//                     <input
//                         type="text"
//                         name="username"
//                         placeholder="Username"
//                         onChange={handleChange}
//                         style={{
//                             width:'100%',
//                             padding:'10px',
//                             marginBottom:'10px'
//                         }}
//                     />

//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         onChange={handleChange}
//                         style={{
//                             width:'100%',
//                             padding:'10px',
//                             marginBottom:'10px'
//                         }}
//                     />

//                     <select
//                         name="role"
//                         onChange={handleChange}
//                         style={{
//                             width:'100%',
//                             padding:'10px',
//                             marginBottom:'10px'
//                         }}
//                     >
//                         <option value="Employee">
//                             Employee
//                         </option>

//                         <option value="HR Officer">
//                             HR Officer
//                         </option>

//                         <option value="Payroll Officer">
//                             Payroll Officer
//                         </option>

//                         <option value="Admin">
//                             Admin
//                         </option>

//                     </select>

//                     <button
//                         type="submit"
//                         style={{
//                             width:'100%',
//                             padding:'10px'
//                         }}
//                     >
//                         Register
//                     </button>

//                 </form>

//                 <p>

//                     Already have an account?

//                     <Link to="/">
//                         Login
//                     </Link>

//                 </p>

//             </div>

//         </div>
//     );
// };

// export default Register;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

// -------------------- Style objects --------------------
const styles = {
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #3c3b5d 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "40px 32px",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  logoText: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#3c3b5d",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "32px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#fafafa",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#fafafa",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    appearance: "auto",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3c3b5d",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.1s",
    marginTop: "8px",
  },
  footer: {
    marginTop: "24px",
    fontSize: "14px",
    color: "#6b7280",
  },
  link: {
    color: "#3c3b5d",
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "4px",
  },
};

// -------------------- Component --------------------
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Employee",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("User Registered");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  // Focus effect handlers
  const applyFocus = (e) => (e.target.style.borderColor = "#3c3b5d");
  const removeFocus = (e) => (e.target.style.borderColor = "#e0e0e0");

  return (
    <div style={styles.outerContainer}>
      <div style={styles.card}>
        <div style={styles.logoText}>Payroll System</div>
        <div style={styles.subtitle}>Create a new account</div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            onFocus={applyFocus}
            onBlur={removeFocus}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            onFocus={applyFocus}
            onBlur={removeFocus}
            required
          />

          <select
            name="role"
            value={formData.role}
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

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#3c3b5d")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            Register
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account?
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;