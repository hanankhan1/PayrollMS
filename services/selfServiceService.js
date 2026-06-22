import axios from "axios";

const API =
"http://localhost:5000/api/self-service";

export const getProfile =
(id)=>
axios.get(
`${API}/profile/${id}`
);

export const getAttendance =
(id)=>
axios.get(
`${API}/attendance/${id}`
);

export const getPayroll =
(id)=>
axios.get(
`${API}/payroll/${id}`
);

export const getPayslips =
(id)=>
axios.get(
`${API}/payslips/${id}`
);