import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation/MainNavigation.jsx";

function RootLayout(){

    return(
        <>
            <MainNavigation/>
            <Outlet />
        </>
    );
}
export default RootLayout;