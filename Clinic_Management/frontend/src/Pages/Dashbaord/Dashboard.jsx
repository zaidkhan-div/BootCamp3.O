import React from "react"
import Layout from "../../components/layout/Layout"
import { Outlet } from "react-router-dom"

const Dashboard = () => {
    return (
        <div>
            <Layout>
                <Outlet />
            </Layout>
        </div>
    )
}

export default Dashboard
