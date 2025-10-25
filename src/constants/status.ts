export const RoleUser = {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    FACTORY_MANAGER: 'factory_manager',
    PRODUCTION_PLANNER: 'production_planner',
    PRODUCTION_SUPERVISOR: 'production_supervisor',
    CARPENTER: 'carpenter',
    QC: 'qc',
    INVENTORY_MANAGER: 'inventory_manager',
    TECHNICAL_DESIGN: 'technical_design',
    ACCOUNTING: 'accounting'
};

export type RoleUser = typeof RoleUser[keyof typeof RoleUser];

export const ROLE_LABELS: { [key in RoleUser]: string } = {
    [RoleUser.ADMIN]: 'Quản lý cấp cao',
    [RoleUser.EMPLOYEE]: 'Nhân viên',
    [RoleUser.FACTORY_MANAGER]: 'Quản lý xưởng',
    [RoleUser.PRODUCTION_PLANNER]: 'Nhân viên kế hoạch sản xuất',
    [RoleUser.PRODUCTION_SUPERVISOR]: 'Tổ trưởng sản xuất',
    [RoleUser.CARPENTER]: 'Thợ mộc',
    [RoleUser.QC]: 'Kiểm tra chất lượng',
    [RoleUser.INVENTORY_MANAGER]: 'Quản lý kho',
    [RoleUser.TECHNICAL_DESIGN]: 'Kỹ thuật/ Thiết kế',
    [RoleUser.ACCOUNTING]: 'Kế toán'

}

export const ROLE_CODES: { [key in RoleUser]: string } = {
    [RoleUser.ADMIN]: 'A',
    [RoleUser.EMPLOYEE]: 'E',
    [RoleUser.FACTORY_MANAGER]: 'FM',
    [RoleUser.PRODUCTION_PLANNER]: 'PP',
    [RoleUser.PRODUCTION_SUPERVISOR]: 'PS',
    [RoleUser.CARPENTER]: 'C',
    [RoleUser.QC]: 'QC',
    [RoleUser.INVENTORY_MANAGER]: 'IM',
    [RoleUser.TECHNICAL_DESIGN]: 'TD',
    [RoleUser.ACCOUNTING]: 'AC'
}

export const ROLE_DEPARTMENT: { [key in RoleUser]: string } = {
    [RoleUser.ADMIN]: 'Quản trị hệ thống',
    [RoleUser.EMPLOYEE]: 'Kinh doanh',
    [RoleUser.FACTORY_MANAGER]: 'Ban giám đốc',
    [RoleUser.PRODUCTION_PLANNER]: 'Kế hoạch sản xuất',
    [RoleUser.PRODUCTION_SUPERVISOR]: 'Xưởng sản xuất',
    [RoleUser.CARPENTER]: 'Xưởng sản xuất',
    [RoleUser.QC]: 'Kiểm soát chất lượng',
    [RoleUser.INVENTORY_MANAGER]: 'Kho',
    [RoleUser.TECHNICAL_DESIGN]: 'Thiết kế - Kỹ thuật',
    [RoleUser.ACCOUNTING]: 'Kế toán - Nhân sự'
}

export const RenderUser = {
    FEMALE: 'female',
    MALE: 'male'
};

export type RenderUser = typeof RenderUser[keyof typeof RenderUser];

export const RENDER_LABELS: { [key in RenderUser]: string } = {
    [RenderUser.FEMALE]: 'Nữ giới',
    [RenderUser.MALE]: 'Nam giới',

}