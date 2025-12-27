import { EVALUATED_STATUS_WORK_MILESTONE_LABELS, EVALUATED_STATUS_WORK_ORDER_LABELS, EvaluatedStatusWorkMilestone, EvaluatedStatusWorkOrder, PRIORITY_DESIGN_REQUEST_LABELS, PriorityDesignRequest, PROCCESS_ORDER_LABELS, PROCCESS_PRODUCT_LABELS, PROCCESS_WORK_ORDER_LABELS, ProccessOrder, ProccessProduct, ProccessWorkOrder, PROGRESS_WORK_ORDER_LABELS, ProgressWorkOrder, RENDER_LABELS, RenderUser, ROLE_CODES, ROLE_DEPARTMENT, ROLE_LABELS, RoleUser, STATUS_DESIGN_REQUEST_LABELS, STATUS_MACHINE_LABELS, STATUS_ORDER_LABELS, STATUS_PRODUCT_LABELS, StatusDesignRequest, StatusMachine, StatusOrder, StatusProduct } from "@/constants/status";

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

//Order
export const getProccessOrderLabel = (proccess: ProccessOrder | null | undefined): string => {
    if(!proccess) return "Chưa xác định";
    return PROCCESS_ORDER_LABELS[proccess] || proccess;
}

export const getStatusOrderLabel = (status: StatusOrder | null | undefined): string => {
    if(!status) return "Chưa xác định";
    return STATUS_ORDER_LABELS[status] || status;
}
// End order

// Product
export const getProccessProductLabel = (proccess: ProccessProduct | null | undefined): string => {
    if(!proccess) return "Chưa xác định";
    return PROCCESS_PRODUCT_LABELS[proccess] || proccess;
}

export const getStatusProductLabel = (status: StatusProduct | null | undefined): string => {
    if(!status) return "Chưa xác định";
    return STATUS_PRODUCT_LABELS[status] || status;
}

export const getStatusProductColor = (status: string | null) => {
  switch (status) {
    case 'completed':
      return { color: 'success' as const };
    case 'in_progress':
      return { color: 'warning' as const };
    case 'pending':
    default:
      return { color: 'error' as const };
  }
};

// End product

// Design Request
export const getStatusDesignRequestLabel = (status: StatusDesignRequest | null | undefined): string => {
  if(!status) return "Chưa xác định";
  return STATUS_DESIGN_REQUEST_LABELS[status] || status;
}

export const getPriorityDesignRequestLabel = (priority: PriorityDesignRequest | null | undefined): string => {
  if(!priority) return "Chưa xác định";
  return PRIORITY_DESIGN_REQUEST_LABELS[priority] || priority;
}
// End Design Request

// WorkOrder
export const getProccessWorkOrderLabel = (proccess: ProccessWorkOrder | null | undefined): string => {
    if(!proccess) return "Chưa xác định";
    return PROCCESS_WORK_ORDER_LABELS[proccess] || proccess;
}

export const getProgressWorkOrderLabel = (status: ProgressWorkOrder | null | undefined): string => {
    if(!status) return "Chưa xác định";
    return PROGRESS_WORK_ORDER_LABELS[status] || status;
}

export const getEvaluatedStatusWorkOrderLabel = (evaluatedStatus: EvaluatedStatusWorkOrder | null | undefined): string => {
    if(!evaluatedStatus) return "Chưa xác định";
    return EVALUATED_STATUS_WORK_ORDER_LABELS[evaluatedStatus] || evaluatedStatus;
}

export const getProccessWorkOrderColor = (status: string | null) => {
  switch (status) {
    case 'completed':
      return { color: 'success' as const };
    case 'in_progress':
      return { color: 'warning' as const };
    case 'pending':
    default:
      return { color: 'error' as const };
  }
};

export const getEvaluatedStatusWorkOrderColor = (evaluatedStatus: string | null) => {
  switch (evaluatedStatus) {
    case 'approved':
      return { color: 'success' as const };
    case 'rework':
      return { color: 'error' as const };
    case 'pending':
    default:
      return { color: 'warning' as const };
  }
};
// End WorkOrder

// Work Milestone
export const getEvaluatedStatusWorkMilestoneLabel = (evaluatedStatus: EvaluatedStatusWorkMilestone | null | undefined): string => {
    if(!evaluatedStatus) return "Chưa xác định";
    return EVALUATED_STATUS_WORK_MILESTONE_LABELS[evaluatedStatus] || evaluatedStatus;
}

export const getEvaluatedStatusWorkMilestoneColor = (evaluatedStatus: string | null) => {
  switch (evaluatedStatus) {
    case 'approved':
      return { color: 'success' as const };
    case 'rework':
      return { color: 'error' as const };
    case 'overdue':
      return { color: 'info' as const };
    case 'pending':
    default:
      return { color: 'warning' as const };
  }
};
// End Work Milestone

export const getStatusOrderColor = (status: string | null) => {
  switch (status) {
    case 'completed':
      return { color: 'success' as const };
    case 'in_progress':
      return { color: 'warning' as const };
    case 'pending':
    default:
      return { color: 'error' as const };
  }
};

export const getStatusDesignRequestColor = (status: string | null) => {
  switch (status) {
    case 'done':
      return { color: 'success' as const };
    case 'pending':
    default:
      return { color: 'warning' as const };
  }
};

export const getStatusMachineLabel = (status: StatusMachine | null | undefined): string => {
  if(!status) return 'Chưa xác định';
  return STATUS_MACHINE_LABELS[status] || status;
}

export const getStatusMachineColor = (status: string | null) => {
  switch (status) {
    case 'faulty':
      return { color: 'error' as const };
    case 'paused':
      return { color: 'warning' as const };
    case 'under_maintenance':
      return { color: 'info' as const };
    case 'under_repair':
      return { color: 'secondary' as const };
    case 'stopped':
      return { color: 'default' as const };
    case 'operating':
    default:
      return { color: 'success' as const };
  }
};

export const getNumber = (number: string) => {
  switch (number) {
    case 'two':
      return 2;
    case 'three':
      return 3
    case 'four':
      return 4
    case 'five':
      return 5
    default:
      return 1;
  }
}