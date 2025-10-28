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
const DesignRequests = Loadable(lazy(() => import('@/views/Manage/DesignRequests/index')));
const BOM = Loadable(lazy(() => import('@/views/Manage/BOM/index')));
const Machines = Loadable(lazy(() => import('@/views/Manage/Machines/index')));
const ProductionSupport = Loadable(lazy(() => import('@/views/Manage/ProductionSupport/index')));
const AsBuilt = Loadable(lazy(() => import('@/views/Manage/AsBuilt/index')));
const Documents = Loadable(lazy(() => import('@/views/Manage/Documents/index')));

const manageRoutes: RouteObject[] = [
    { index: true, element: <Navigate to={ROUTE_PATH.MANAGE_HOME} replace/> },
    { path: ROUTE_PATH.MANAGE_HOME, element: <Home/> },
    { path: ROUTE_PATH.MANAGE_DECENTRALIZATION_ACCOUNT, element: <Account/> },
    { path: ROUTE_PATH.MANAGE_JOB, element: <Job/> },
    { path: ROUTE_PATH.MANAGE_INFORMATION, element: <Information/> },
    { path: ROUTE_PATH.MANAGE_ACTION, element: <Action/> },
    { path: ROUTE_PATH.MANAGE_MENU, element: <Menu/> },
    { path: ROUTE_PATH.MANAGE_ORDER, element: <Orders/> },
    { path: ROUTE_PATH.MANAGE_CUSTOMER, element: <Customers/> },
    { path: ROUTE_PATH.MANAGE_REPORT, element: <Reports/> },
    { path: ROUTE_PATH.MANAGE_DESIGN_REQUESTS, element: <DesignRequests/> },
    { path: ROUTE_PATH.MANAGE_BOM, element: <BOM/> },
    { path: ROUTE_PATH.MANAGE_MACHINES, element: <Machines/> },
    { path: ROUTE_PATH.MANAGE_PRODUCTION_SUPPORT, element: <ProductionSupport/> },
    { path: ROUTE_PATH.MANAGE_AS_BUILT, element: <AsBuilt/> },
    { path: ROUTE_PATH.MANAGE_DOCUMENTS, element: <Documents/> }
];

export default manageRoutes;