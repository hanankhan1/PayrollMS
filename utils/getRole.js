export const getRole = () => {

    const user =
    JSON.parse(
        localStorage.getItem("user")
    );

    return user?.role;
};