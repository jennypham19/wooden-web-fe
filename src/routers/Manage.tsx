import Loadable from "@/components/Loadable";
import { ROUTE_PATH } from "@/constants/routes";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = Loadable(lazy(() => import('@/views/Manage/Home/index')));
const Account = Loadable(lazy(() => import('@/views/Manage/Account/index')));  // Phân quyền quản lý
const Information = Loadable(lazy(() => import('@/views/Manage/Information/index'))); // Thông tin cá nhân
const Job = Loadable(lazy(() => import('@/views/Manage/Job/index')));  // Quản lý công việc
const Action = Loadable(lazy(() => import('@/views/Manage/Permission/Action/index')));  // Thao tác
const Menu = Loadable(lazy(() => import('@/views/Manage/Permission/Menu/index')));  // Chức năng 
const Orders = Loadable(lazy(() => import('@/views/Manage/Orders/index'))); // Quản lý đơn hàng
const Customers = Loadable(lazy(() => import('@/views/Manage/Customers/index'))); // Quản lý khách hàng
const Reports = Loadable(lazy(() => import('@/views/Manage/Report/index')));  // Báo cáo doanh số
const DesignRequests = Loadable(lazy(() => import('@/views/Manage/DesignRequests/index')));  // Yêu cầu thiết kế
const BOM = Loadable(lazy(() => import('@/views/Manage/BOM/index')));  // BOM & Hồ sơ kỹ thuật
const Machines = Loadable(lazy(() => import('@/views/Manage/Machines/index')));   // Quản lý máy móc
const ProductionSupport = Loadable(lazy(() => import('@/views/Manage/ProductionSupport/index')));    // Hỗ trợ sản xuất
const AsBuilt = Loadable(lazy(() => import('@/views/Manage/AsBuilt/index')));   // Bản vẽ hoàn công
const Documents = Loadable(lazy(() => import('@/views/Manage/Documents/index')));    // Tài liệu và hướng dẫn
const Plans = Loadable(lazy(() => import('@/views/Manage/Plan/index')));    // Quản lý kế hoạch
const ProductionTracking = Loadable(lazy(() => import('@/views/Manage/MonitoringCoordination/ProductionTracking/index')));    // Theo dõi tiến độ 
const WorkshopCoordinationQualityControl = Loadable(lazy(() => import('@/views/Manage/MonitoringCoordination/WorkshopCoordinationQualityControl/index')));    // Điều phối xưởng & QC 
const UpdateEquipmentStatus = Loadable(lazy(() => import('@/views/Manage/MonitoringCoordination/UpdateEquipmentStatus/index')));    // Cập nhật tình trạng thiết bị/ máy móc
const ProductionProgressReport = Loadable(lazy(() => import('@/views/Manage/Reports/ProductionProgressReport/index')));    // Báo cáo tiến độ sản xuất
const ProductivityReport = Loadable(lazy(() => import('@/views/Manage/Reports/ProductivityReport/index')));    // Báo cáo hiệu suất
const NotificationsReminders = Loadable(lazy(() => import('@/views/Manage/AdditionalSupport/NotificationsReminders/index')));    // Thông báo/ Nhắc việc
const DocumentsGuides = Loadable(lazy(() => import('@/views/Manage/AdditionalSupport/DocumentsGuides/index')));    // Tài liệu & hướng dẫn


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
    { path: ROUTE_PATH.MANAGE_DOCUMENTS, element: <Documents/> },
    { path: ROUTE_PATH.MANAGE_PLANS, element: <Plans/> },
    { path: ROUTE_PATH.MANAGE_PRODUCTION_TRACKING, element: <ProductionTracking/> },
    { path: ROUTE_PATH.MANAGE_WORKSHOP_COORDINATION_QC, element: <WorkshopCoordinationQualityControl/> },
    { path: ROUTE_PATH.MANAGE_UPDATE_EQUIPMENT_STATUS, element: <UpdateEquipmentStatus/> },
    { path: ROUTE_PATH.MANAGE_PRODUCTION_PROGRESS_REPORT, element: <ProductionProgressReport/> },
    { path: ROUTE_PATH.MANAGE_PRODUCTIVITY_REPORT, element: <ProductivityReport/> },
    { path: ROUTE_PATH.MANAGE_NOTIFICATIONS_REMINDERS, element: <NotificationsReminders/> },
    { path: ROUTE_PATH.MANAGE_DOCUMENTS_GUIDES, element: <DocumentsGuides/> },
];

export default manageRoutes;