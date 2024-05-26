import React from 'react';
import TopNavigation from "../topbar/TopNavigation";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from 'react-router-dom';
import MainLayoutCss from "./mainlayout.module.css";

const MainLayout = () => {
  return (
    <div className={MainLayoutCss.container}>
            <div className={MainLayoutCss.sidebarMain}>
                <Sidebar />
            </div>
            <div className={MainLayoutCss.headerMain}>
                <TopNavigation />
            </div>



            {/* <ErrorBoundary fallback={ErrorPage}> */}
            <div className={MainLayoutCss.mainContent}>
            <Outlet />
            </div>
            {/* </ErrorBoundary> */}
        </div>
  )
}

export default MainLayout