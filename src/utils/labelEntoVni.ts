import { RENDER_LABELS, RenderUser, ROLE_CODES, ROLE_DEPARTMENT, ROLE_LABELS, RoleUser } from "@/constants/status";

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

