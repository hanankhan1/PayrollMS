import {
useEffect,
useState
}
from "react";

import MainLayout
from "../layouts/MainLayout";

import {
getEmployeePayslips
}
from "../services/payslipService";

const EmployeePayslips = ()=>{

const user =
JSON.parse(
localStorage.getItem("user")
);

const [payslips,
setPayslips]
= useState([]);

useEffect(()=>{

loadPayslips();

},[]);

const loadPayslips =
async()=>{

const res =
await getEmployeePayslips(
user.employee_id
);

setPayslips(
res.data
);

};

return(

<MainLayout>

<h2>
My Payslips
</h2>

<table>

<thead>

<tr>

<th>Month</th>
<th>Year</th>
<th>Salary</th>
<th>Download</th>

</tr>

</thead>

<tbody>

{
payslips.map(
(item)=>(

<tr
key={
item.payslip_id
}
>

<td>
{item.payroll_month}
</td>

<td>
{item.payroll_year}
</td>

<td>
{item.net_salary}
</td>

<td>

<a
href={
`http://localhost:5000/api/payslips/download/${item.pdf_path}`
}
target="_blank"
rel="noreferrer"
>

Download

</a>

</td>

</tr>

))
}

</tbody>

</table>

</MainLayout>

);

};

export default EmployeePayslips;