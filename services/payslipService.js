import axios from "axios";

const API =
"http://localhost:5000/api/payslips";

export const getPayslips =
()=>axios.get(API);

export const getEmployeePayslips =
(employeeId)=>
axios.get(
`${API}/employee/${employeeId}`
);

export const generatePayslip =
(payrollId)=>{

const user =
JSON.parse(
localStorage.getItem("user")
);

return axios.post(
`${API}/generate/${payrollId}`,
{},
{
headers:{
role:user.role
}
}
);

};

export const downloadPayslip =
(fileName)=>
`${API}/download/${fileName}`;