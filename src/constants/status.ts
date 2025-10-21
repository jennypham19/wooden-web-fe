export const RoleUser = {
    ADMIN: 'admin',
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
    [RoleUser.FACTORY_MANAGER]: 'FM',
    [RoleUser.PRODUCTION_PLANNER]: 'PP',
    [RoleUser.PRODUCTION_SUPERVISOR]: 'PS',
    [RoleUser.CARPENTER]: 'C',
    [RoleUser.QC]: 'QC',
    [RoleUser.INVENTORY_MANAGER]: 'IM',
    [RoleUser.TECHNICAL_DESIGN]: 'TD',
    [RoleUser.ACCOUNTING]: 'AC'
}
