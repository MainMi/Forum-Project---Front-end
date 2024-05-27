import { Outlet } from "react-router-dom";
import Header from '../Layout/header/Header';
import NotificationStatus from "../components/root/Notification/Notification-status";

const RootLayout = () => {

    return (
        <>
            <NotificationStatus />
            <Header/>
            <Outlet/>
        </>
    )
}

export default RootLayout;