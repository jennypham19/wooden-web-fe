import { ROLE_CODES, ROLE_LABELS, RoleUser } from "@/constants/status";

export const getRoleLabel = (role: RoleUser | null | undefined) : string => {
    if(!role) return "Chưa xác định";
    return ROLE_LABELS[role] || role;
}

export const getRoleCode = (role: RoleUser): string => {
    return ROLE_CODES[role] || role;
}

