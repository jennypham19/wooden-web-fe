import { FormDataStatusMachine } from "@/types/machine";
import { FormErrorsMaintenance } from "../UpdateMachine";
import { StatusMachine } from "@/constants/status";

export const useValidateMachine = (formData: FormDataStatusMachine, status: string) => {
    const validateFaulty = () : FormErrorsMaintenance => {
        const errors: FormErrorsMaintenance = {};
        if (!formData.status) errors.status = "Vui lòng chọn trạng thái";
        if (!formData.reason) errors.reason = "Vui lòng nhập lý do gặp sự cố";
        return errors;
    };
    
    const validatePaused = () : FormErrorsMaintenance => {
        const errors: FormErrorsMaintenance = {};
        if(!formData.status) errors.status = "Vui lòng chọn trạng thái";
        if(!formData.startAgainDate) errors.startAgainDate = "Vui lòng chọn ngày khởi động lại";
        if(!formData.reason) errors.reason = "Vui lòng nhập lý do bị dừng hoạt động";
        return errors
    };

    const validateMaintenance = () : FormErrorsMaintenance => {
        const errors: FormErrorsMaintenance = {};
        if(!formData.status) errors.status = "Vui lòng chọn trạng thái";
        if(!formData.maintenanceDate) errors.maintenanceDate = "Vui lòng chọn ngày bảo dưỡng";
        if(!formData.reason) errors.reason = "Vui lòng nhập mô tả tình trạng";
        if(!formData.maintenancePercentage) errors.maintenancePercentage = "Vui lòng chọn mức độ bảo dưỡng";
        return errors
    };

    const validateRepair = () : FormErrorsMaintenance => {
        const errors: FormErrorsMaintenance = {};
        if(!formData.status) errors.status = "Vui lòng chọn trạng thái";
        if(!formData.repairedDate) errors.repairedDate = "Vui lòng chọn ngày sửa chữa";
        if(!formData.reason) errors.reason = "Vui lòng nhập mô tả tình trạng";
        return errors
    };

    const validateStopped = () : FormErrorsMaintenance => {
        const errors: FormErrorsMaintenance = {};
        if (!formData.status) errors.status = "Vui lòng chọn trạng thái";
        if (!formData.reason) errors.reason = "Vui lòng nhập lý do không hoạt động";
        return errors;
    };

    const validate = () : FormErrorsMaintenance => {
        switch (status) {
            case StatusMachine.FAULTY:
                return validateFaulty();
            case StatusMachine.PAUSED:
                return validatePaused();
            case StatusMachine.UNDER_MAINTENANCE:
                return validateMaintenance();
            case StatusMachine.UNDER_REPAIR:
                return validateRepair();
            case StatusMachine.STOPPED:
                return validateStopped();
            default:
                return {};
        }
    };

    return { validate };
}