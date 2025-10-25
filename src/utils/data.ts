import { SectionItem } from "@/layouts/Dashboard/Sidebar/Sections";
import { IMenu, IPermission } from "@/types/permission";
import { AccountCircle, Build, ContentPaste, Group, HomeOutlined, List, ListAlt, LockOutlined, Settings, SvgIconComponent, WorkOutline } from "@mui/icons-material";

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
    ListAlt
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