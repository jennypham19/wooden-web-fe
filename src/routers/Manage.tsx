import Loadable from "@/components/Loadable";
import { ROUTE_PATH } from "@/constants/routes";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = Loadable(lazy(() => import('@/views/Manage/Home/index')));
const Account = Loadable(lazy(() => import('@/views/Manage/Account/index')));
const Information = Loadable(lazy(() => import('@/views/Manage/Information/index')));
const Job = Loadable(lazy(() => import('@/views/Manage/Job/index')));
const Action = Loadable(lazy(() => import('@/views/Manage/Permission/Action/index')));
const Menu = Loadable(lazy(() => import('@/views/Manage/Permission/Menu/index')));
const Orders = Loadable(lazy(() => import('@/views/Manage/Orders/index')));
const Customers = Loadable(lazy(() => import('@/views/Manage/Customers/index')));
const Reports = Loadable(lazy(() => import('@/views/Manage/Report/index')));

const manageRoutes: RouteObject[] = [
    { index: true, element: <Navigate to={ROUTE_PATH.MANAGE_HOME} replace/>},
    { path: ROUTE_PATH.MANAGE_HOME, element: <Home/>},
    { path: ROUTE_PATH.MANAGE_DECENTRALIZATION_ACCOUNT, element: <Account/>},
    { path: ROUTE_PATH.MANAGE_JOB, element: <Job/>},
    { path: ROUTE_PATH.MANAGE_INFORMATION, element: <Information/>},
    { path: ROUTE_PATH.MANAGE_ACTION, element: <Action/>},
    { path: ROUTE_PATH.MANAGE_MENU, element: <Menu/>},
    { path: ROUTE_PATH.MANAGE_ORDER, element: <Orders/>},
    { path: ROUTE_PATH.MANAGE_CUSTOMER, element: <Customers/>},
    { path: ROUTE_PATH.MANAGE_REPORT, element: <Reports/>},
];

export default manageRoutes;