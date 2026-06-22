import axios from "axios";

const API =
"http://localhost:5000/api/salary-structure";

export const getStructures =
()=>axios.get(API);

export const addStructure =
(data)=>axios.post(API,data);

export const updateStructure =
(id,data)=>
axios.put(
`${API}/${id}`,
data
);

export const deleteStructure =
(id)=>
axios.delete(
`${API}/${id}`
);