import {Navigate, Outlet} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {firebaseApp} from "../../../data/firebase/firebase";

export const PublicRoutes = () => {
    let isAuth = getAuth(firebaseApp).currentUser?.uid != undefined;

    if (isAuth) return <Navigate to={'/tasks'}/>;
    return (<Outlet/>)
}