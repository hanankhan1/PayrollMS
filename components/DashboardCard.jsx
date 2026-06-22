const DashboardCard = ({ title, value }) => {

    return (

        <div
            style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "15px",
                boxShadow:
                    "0 5px 15px rgba(0,0,0,.08)"
            }}
        >
            <h3>{title}</h3>

            <h1>{value}</h1>

        </div>

    );
};

export default DashboardCard;