import { DataMachinesRequest, DataStatusMachinePayload, IMachine } from "@/types/machine";
import HttpClient from "@/utils/HttpClient";
import { GetParams, PaginatedResponse } from "./base-service";
import { HttpResponse } from "@/types/common";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/machines`;

// Tạo mới máy móc
export const createMachine = async(payload: DataMachinesRequest) => {
    const url = `${prefix}/machine-created`;
    return HttpClient.post(url, payload);
}

// Lấy danh sách
export const getMachines = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IMachine>>> => {
    const url = `${prefix}/list-machines`;
    const params: Record<string, any> = {
        page: getParams.page,
        limit: getParams.limit
    }
    if(getParams.searchTerm && getParams.searchTerm.trim()){
        params.searchTerm = getParams.searchTerm
    }
    if(getParams.status !== 'all'){
        params.status = getParams.status
    };
    const response = await HttpClient.get<{
        success: boolean,
        message: string,
        data: PaginatedResponse<IMachine>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response
    }else{
        throw new Error(response.message || 'Failed to fetch list machines')
    }
}

// Lấy chi tiêt bản ghi
export const getMachineById = async(id: string) => {
    return HttpClient.get<any, HttpResponse<IMachine>>(`${prefix}/detail-machine/${id}`)
}

// Cập nhật các trường theo status
export const updateMachineByStatus = async(id: string, payload: DataStatusMachinePayload) => {
    return HttpClient.put<any>(`${prefix}/machine-updated-by-status/${id}`, payload as any)
}

// Cập nhật trường ngày sửa xong
export const updateMachineCompletionDate = async(id: string, payload: { status: string, completionDate: string | null }) => {
    return HttpClient.put<any>(`${prefix}/repaired-date-updated/${id}`, payload as any )
}