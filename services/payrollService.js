import axios from "axios";

const API =
"http://localhost:5000/api/payroll";

export const getPayrolls =
()=>axios.get(API);

export const generatePayroll =
(data)=>
axios.post(
`${API}/generate`,
data
);

export const deletePayroll =
(id)=>
axios.delete(
`${API}/${id}`
);