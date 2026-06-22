import axios from "axios";

const API =
"http://localhost:5000/api/departments";

export const getDepartments =
() =>
axios.get(API);

export const addDepartment =
(data)=>
axios.post(API,data);

export const updateDepartment =
(id,data)=>
axios.put(
`${API}/${id}`,
data
);

export const deleteDepartment =
(id)=>
axios.delete(
`${API}/${id}`
);

export const searchDepartment =
(keyword)=>
axios.get(
`${API}/search/${keyword}`
);