import axios from "axios";

const API =
"http://localhost:5000/api/reports";

export const getPayrollSummary =
()=>axios.get(
`${API}/payroll-summary`
);

export const getDepartmentSalary =
()=>axios.get(
`${API}/department-salary`
);

export const getEmployeeHistory =
(id)=>axios.get(
`${API}/employee-history/${id}`
);

export const getAttendanceReport =
()=>axios.get(
`${API}/attendance-report`
);