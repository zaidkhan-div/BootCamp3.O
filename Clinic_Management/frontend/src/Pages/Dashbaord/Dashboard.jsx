import React from "react"
import Layout from "../../components/layout/Layout"
import { Outlet } from "react-router-dom"

const Dashboard = () => {
    return (
        <div>
            <Layout>
                {/* <div className="flex justify-end items-center p-2">
                </div>
                <div className="p-2">
                </div> */}
                <Outlet />
            </Layout>
        </div>
    )
}

export default Dashboard
