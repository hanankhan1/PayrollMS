import axios from "axios";

const API =
"http://localhost:5000/api/users";

export const getUsers =
()=>axios.get(API);

export const getEmployees =
()=>axios.get(
`${API}/employees`
);

export const createUser =
(data)=>axios.post(
API,
data
);

export const deleteUser =
(id)=>axios.delete(
`${API}/${id}`
);
// Add this to your userService.js
export const updateUser = async (userId, userData) => {
    const response = await axios.put(
        `${API_URL}/users/${userId}`,
        userData
    );
    return response.data;
};