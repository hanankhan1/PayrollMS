import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {

    return (

        <>
            <Sidebar />

            <div
                style={{
                    marginLeft: "260px",
                    minHeight: "100vh",
                    background: "#f4f6f9"
                }}
            >

                <Navbar />

                <div
                    style={{
                        padding: "25px"
                    }}
                >
                    {children}
                </div>

            </div>
        </>
    );
};

export default MainLayout;