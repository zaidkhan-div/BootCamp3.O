import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from "react-icons/io"
import { addThousandsSeparator } from '../../utils/helper';
import InfoCard from '../../components/Cards/InfoCard';
import ExpenseTransactions from '../../components/Dashbaord/ExpenseTransactions';
import RecentTransactions from '../../components/Dashbaord/RecentTransactions';
import last30DaysExpenses from '../../components/Dashbaord/last30DaysExpenses';
import RecentIncomeWidthChart from '../../components/Dashbaord/RecentIncomeWidthChart';
import RecentIncome from '../../components/Dashbaord/RecentIncome';

const Home = () => {

    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log({ dashboardData })

    const fetchDashbaordData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again", error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashbaordData();

        return () => { }
    }, [])

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className='my-5 mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-primary"
                    />

                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-orange-500"
                    />

                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Expense"
                        value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
                        color="bg-red-500"
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <RecentTransactions
                        trasnactions={dashboardData?.recentTransactions
                        }
                        onSeeMore={() => navigate("/expense")}
                    />

                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpenses={dashboardData?.totalExpenses || 0}
                    />
                    <ExpenseTransactions
                        trasnactions={dashboardData?.last30DaysExpenses?.trasnactions || []}
                        onSeeMore={() => navigate("/expense")}
                    />

                    <last30DaysExpenses
                        data={dashboardData?.last30DaysExpenses?.trasnactions || []}
                    />

                    <RecentIncomeWidthChart
                        data={dashboardData?.last60DaysIncome?.trasnactions?.slice(0, 4) || []}
                        totalIncome={dashboardData?.totalIncome || 0}
                    />

                    <RecentIncome
                        trasnactions={dashboardData?.last60DaysIncome?.trasnactions || []}
                        onSeeMore={()=>navigate("/income")}
                    />

                </div>
            </div>
        </DashboardLayout>
    )
}

export default Home