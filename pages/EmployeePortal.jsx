import {
useState,
useEffect
}
from "react";

import MainLayout
from "../layouts/MainLayout";

import {
getProfile,
getAttendance,
getPayroll,
getPayslips
}
from "../services/selfServiceService";

const EmployeePortal=()=>{

const user=
JSON.parse(
localStorage.getItem("user")
);

const employeeId=
user.employee_id;

const [profile,setProfile]
=useState({});

const [attendance,
setAttendance]
=useState([]);

const [payroll,
setPayroll]
=useState([]);

const [payslips,
setPayslips]
=useState([]);

useEffect(()=>{

loadData();

},[]);

const loadData=
async()=>{

const p=
await getProfile(employeeId);

const a=
await getAttendance(employeeId);

const pay=
await getPayroll(employeeId);

const slip=
await getPayslips(employeeId);

setProfile(p.data);
setAttendance(a.data);
setPayroll(pay.data);
setPayslips(slip.data);

};

return(

<MainLayout>

<h1>
Employee Self Service Portal
</h1>

{/* Profile */}

<div className="card">

<h2>
My Profile
</h2>

<p>
Name:
{profile.full_name}
</p>

<p>
CNIC:
{profile.cnic}
</p>

<p>
Email:
{profile.email}
</p>

<p>
Department:
{profile.department_name}
</p>

<p>
Designation:
{profile.designation}
</p>

</div>

<br/>

{/* Payroll */}

<div className="card">

<h2>
Payroll History
</h2>

<table>

<thead>

<tr>

<th>Month</th>
<th>Year</th>
<th>Gross</th>
<th>Net</th>

</tr>

</thead>

<tbody>

{
payroll.map(row=>(

<tr
key={row.payroll_id}
>

<td>
{row.payroll_month}
</td>

<td>
{row.payroll_year}
</td>

<td>
{row.gross_salary}
</td>

<td>
{row.net_salary}
</td>

</tr>

))
}

</tbody>

</table>

</div>

<br/>

{/* Attendance */}

<div className="card">

<h2>
Attendance History
</h2>

<table>

<thead>

<tr>

<th>Date</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{
attendance.map(row=>(

<tr
key={row.attendance_id}
>

<td>
{row.attendance_date}
</td>

<td>
{row.attendance_status}
</td>

</tr>

))
}

</tbody>

</table>

</div>

<br/>

{/* Payslips */}

<div className="card">

<h2>
Payslips
</h2>

<table>

<thead>

<tr>

<th>ID</th>
<th>Month</th>
<th>Year</th>
<th>File</th>

</tr>

</thead>

<tbody>

{
payslips.map(row=>(

<tr
key={row.payslip_id}
>

<td>
{row.payslip_id}
</td>

<td>
{row.payroll_month}
</td>

<td>
{row.payroll_year}
</td>

<td>

<a
href={`http://localhost:5000/api/payslips/download/${row.pdf_path}`}
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

</div>

</MainLayout>

);

};

export default EmployeePortal;