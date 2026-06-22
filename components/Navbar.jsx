const Navbar = () => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (

    <div
      style={{
        background: "#fff",
        padding: "18px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "0 2px 10px rgba(0,0,0,.08)"
      }}
    >

      <h2
        style={{
          margin: 0
        }}
      >
        Payroll Management System
      </h2>

      <div>

        <div
          style={{
            fontWeight: "bold"
          }}
        >
          {user?.username}
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "gray"
          }}
        >
          {user?.role}
        </div>

      </div>

    </div>

  );
};

export default Navbar;