import { PROCCESS_ORDER_LABELS, ProccessOrder, RENDER_LABELS, RenderUser, ROLE_CODES, ROLE_DEPARTMENT, ROLE_LABELS, RoleUser, STATUS_ORDER_LABELS, StatusOrder } from "@/constants/status";

export const getRoleLabel = (role: RoleUser | null | undefined) : string => {
    if(!role) return "Chưa xác định";
    return ROLE_LABELS[role] || role;
}

export const getRoleCode = (role: RoleUser): string => {
    return ROLE_CODES[role] || role;
}

export const getRoleDepartment = (role: RoleUser): string => {
    return ROLE_DEPARTMENT[role] || role;
}

export const getRenderLabel = (gender: RenderUser | null | undefined) : string => {
    if(!gender) return "Chưa xác định";
    return RENDER_LABELS[gender] || gender;
}

export const getProccessOrderLabel = (proccess: ProccessOrder | null | undefined): string => {
    if(!proccess) return "Chưa xác định";
    return PROCCESS_ORDER_LABELS[proccess] || proccess;
}

export const getStatusOrderLabel = (status: StatusOrder | null | undefined): string => {
    if(!status) return "Chưa xác định";
    return STATUS_ORDER_LABELS[status] || status;
}

export const getStatusOrderColor = (status: string | null) => {
  switch (status) {
    case 'completed':
      return { color: 'success' as const };
    case 'in_proccess':
      return { color: 'warning' as const };
    case 'pending':
    default:
      return { color: 'error' as const };
  }
};