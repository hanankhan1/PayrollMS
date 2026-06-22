import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";

import {
    getAdminStats,
    getHRStats,
    getPayrollStats,
    getEmployeeStats
} from "../services/dashboardService";

const Dashboard = () => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const role = user?.role;

    const [stats, setStats] = useState({});

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {

        try {

            if (role === "Admin") {

                const res =
                await getAdminStats();

                setStats(res.data);
            }

            else if (role === "HR Officer") {

                const res =
                await getHRStats();

                setStats(res.data);
            }

            else if (role === "Payroll Officer") {

                const res =
                await getPayrollStats();

                setStats(res.data);
            }

            else if (role === "Employee") {

                const res =
                await getEmployeeStats(
                    user.employee_id
                );

                setStats(res.data);
            }

        } catch (error) {

            console.log(
                "Dashboard Error:",
                error
            );
        }
    };

    return (

        <MainLayout>

            <div
                style={{
                    marginBottom: "30px"
                }}
            >
                <h1>
                    Welcome, {user?.username}
                </h1>

                <p>
                    Role: {role}
                </p>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(250px,1fr))",
                    gap: "20px"
                }}
            >

                {/* ADMIN DASHBOARD */}

                {role === "Admin" && (
                    <>
                        <DashboardCard
                            title="Employees"
                            value={stats.employees || 0}
                        />

                        <DashboardCard
                            title="Departments"
                            value={stats.departments || 0}
                        />

                        <DashboardCard
                            title="Payroll Records"
                            value={stats.payroll || 0}
                        />

                        <DashboardCard
                            title="Payslips"
                            value={stats.payslips || 0}
                        />
                    </>
                )}

                {/* HR DASHBOARD */}

                {role === "HR Officer" && (
                    <>
                        <DashboardCard
                            title="Employees"
                            value={stats.employees || 0}
                        />

                        <DashboardCard
                            title="Present Today"
                            value={stats.presentToday || 0}
                        />

                        <DashboardCard
                            title="Absent Today"
                            value={stats.absentToday || 0}
                        />

                        <DashboardCard
                            title="Leaves Today"
                            value={stats.leavesToday || 0}
                        />
                    </>
                )}

                {/* PAYROLL OFFICER DASHBOARD */}

                {role === "Payroll Officer" && (
                    <>
                        <DashboardCard
                            title="Payroll Processed"
                            value={stats.payrollProcessed || 0}
                        />

                        <DashboardCard
                            title="Pending Payroll"
                            value={stats.pendingPayroll || 0}
                        />

                        <DashboardCard
                            title="Payslips"
                            value={stats.payslips || 0}
                        />

                        <DashboardCard
                            title="Salary Expense"
                            value={`Rs. ${stats.salaryExpense || 0}`}
                        />
                    </>
                )}

                {/* EMPLOYEE DASHBOARD */}

                {role === "Employee" && (
                    <>
                        <DashboardCard
                            title="Attendance"
                            value={stats.attendance || 0}
                        />

                        <DashboardCard
                            title="Latest Salary"
                            value={`Rs. ${stats.salary || 0}`}
                        />

                        <DashboardCard
                            title="Payslips"
                            value={stats.payslips || 0}
                        />

                        <DashboardCard
                            title="Working Days"
                            value={stats.workingDays || 0}
                        />
                    </>
                )}

            </div>

        </MainLayout>
    );
};

export default Dashboard;