import axios from "axios";

const API =
"http://localhost:5000/api/dashboard";

export const getAdminStats =
()=>axios.get(`${API}/admin`);

export const getHRStats =
()=>axios.get(`${API}/hr`);

export const getPayrollStats =
()=>axios.get(`${API}/payroll`);

export const getEmployeeStats =
(id)=>axios.get(
`${API}/employee/${id}`
);