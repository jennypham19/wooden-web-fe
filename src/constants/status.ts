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

export const ProccessOrder = {
    NOT_START_0: 'not_started_0%',
    IN_PROGRESS_25: 'in_progress_25%',
    IN_PROGRESS_50: 'in_progress_50%',
    IN_PROGRESS_75: 'in_progress_75%',
    COMPLETED_100: 'completed_100%',
}

export type ProccessOrder = typeof ProccessOrder[keyof typeof ProccessOrder];

export const PROCCESS_ORDER_LABELS: { [key in ProccessOrder]: string } = {
    [ProccessOrder.NOT_START_0]: 'Chưa hoạt động 0%',
    [ProccessOrder.IN_PROGRESS_25]: 'Đang hoạt động 25%',
    [ProccessOrder.IN_PROGRESS_50]: 'Đang hoạt động 50%',
    [ProccessOrder.IN_PROGRESS_75]: 'Đang hoạt động 75%',
    [ProccessOrder.COMPLETED_100]: 'Đã hoàn thành 100%',
}

export const StatusOrder = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
}

export type StatusOrder = typeof StatusOrder[keyof typeof StatusOrder];

export const STATUS_ORDER_LABELS: { [key in StatusOrder]: string } = {
    [StatusOrder.PENDING]: 'Chưa hoạt động',
    [StatusOrder.IN_PROGRESS]: 'Đang hoạt động',
    [StatusOrder.COMPLETED]: 'Đã hoàn thành',
}

export const StatusMachine = {
    OPERATING: 'operating',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    UNDER_MAINTENANCE: 'under_maintenance',
    UNDER_REPAIR: 'under_repair',
    FAULTY: 'faulty',
}

export type StatusMachine = typeof StatusMachine[keyof typeof StatusMachine];

export const STATUS_MACHINE_LABELS: { [key in StatusMachine]: string } = {
    [StatusMachine.OPERATING]: 'Đang hoạt động',
    [StatusMachine.PAUSED]: 'Tạm dừng',
    [StatusMachine.STOPPED]: 'Ngừng hoạt động',
    [StatusMachine.UNDER_MAINTENANCE]: 'Đang bảo dưỡng',
    [StatusMachine.UNDER_REPAIR]: 'Đang sửa chữa',
    [StatusMachine.FAULTY]: 'Gặp sự cố',
}

export const PriorityDesignRequest = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent'
}

export type PriorityDesignRequest = typeof PriorityDesignRequest[keyof typeof PriorityDesignRequest];

export const PRIORITY_DESIGN_REQUEST_LABELS: { [key in PriorityDesignRequest]: string } = {
    [PriorityDesignRequest.LOW]: 'Thấp',
    [PriorityDesignRequest.MEDIUM]: 'Trung bình',
    [PriorityDesignRequest.HIGH]: 'Cao',
    [PriorityDesignRequest.URGENT]: 'Khẩn cấp',
}

export const StatusDesignRequest = {
    PENDING: 'pending',
    DONE: 'done',
}

export type StatusDesignRequest = typeof StatusDesignRequest[keyof typeof StatusDesignRequest];

export const STATUS_DESIGN_REQUEST_LABELS: { [key in StatusOrder]: string } = {
    [StatusDesignRequest.PENDING]: 'Đang thiết kế',
    [StatusDesignRequest.DONE]: 'Đã hoàn thành',
}