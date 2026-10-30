import { SectionItem } from "@/layouts/Dashboard/Sidebar/Sections";
import { ICustomer, ICustomerInFuni } from "@/types/customer";
import { IMenu, IPermission } from "@/types/permission";
import { AccountBalanceWallet, AccountCircle, Analytics, Assessment, Assignment, Build, BuildCircle, Construction, ContentPaste, DashboardCustomize, DrawOutlined, EventNote, FactCheck, Group, HomeOutlined, Hub, Inventory, Inventory2, InventoryOutlined, List, ListAlt, LocalShipping, LockOutlined, Map, MenuBook, MenuBookOutlined, MoveToInbox, Notifications, Outbound, PrecisionManufacturing, QueryStats, RequestQuote, Settings, SupportAgent, SvgIconComponent, Timeline, TrackChanges, WorkOutline } from "@mui/icons-material";

export const iconMap: Record<string, SvgIconComponent> = {
    HomeOutlined,
    LockOutlined,
    WorkOutline,
    AccountCircle,
    Settings,
    Build,
    List,
    ContentPaste,
    Group,
    ListAlt,
    Assignment,
    InventoryOutlined,
    PrecisionManufacturing,
    Construction,
    DrawOutlined,
    MenuBookOutlined,
    EventNote,
    DashboardCustomize,
    TrackChanges,
    Hub,
    BuildCircle,
    Assessment,         // Báo cáo & thống kê, .....
    Timeline,
    Analytics,
    SupportAgent,
    Notifications,
    MenuBook,
    Map,
    Inventory2,          // Danh mục vật tư
    MoveToInbox,          // Nhập kho
    Outbound,              // Xuất kho
    Inventory,              // Tồn kho & Cảnh báo
    FactCheck,              // Kiểm kê kho
    RequestQuote,           // Chi phí vật tư theo đơn hàng
    AccountBalanceWallet,    // Quản lý thu-chi
    LocalShipping,           // Quản lý nhà cung cấp
    QueryStats              // Báo cáo & thống kê
              
}

export const mapMenuToSectionItems = (menus: IMenu[]): SectionItem[] => {
  return menus.map((menu) => ({
    title: menu.name,
    path: menu.path ?? '',
    icon: menu.icon ? iconMap[menu.icon] : undefined,
    children: menu.children ? mapMenuToSectionItems(menu.children) : undefined,
  }));
};

export const mapPermissionsToSectionItems = (group: IPermission): SectionItem[] => {
    return mapMenuToSectionItems(group.permissions) 
};

const mapFuniCustomerToMoc = (customer: ICustomerInFuni): ICustomer => {
  return {
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    type: customer.type,
    title: customer.title,
    address: customer.address,
    requiredNote: customer.requiredNote,
    amountOfOrders: customer.amountOfOrder,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt
  }
}

export const mapFuniCustomersToMoc = (customers: ICustomerInFuni[]) : ICustomer[] => {
  return customers.map(mapFuniCustomerToMoc)
}