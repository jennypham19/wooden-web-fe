import HttpClient from "@/utils/HttpClient";
import { GetParams, PaginatedResponse } from "./base-service";
import { HttpResponse } from "@/types/common";
import { DesignRequestPayload, FormDataUpdateDesignRequest, IDesignRequest } from "@/types/design-request";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/design-requests`;

// Lấy danh sách
export const getListDesignRequests = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IDesignRequest>>> => {
    const url = `${prefix}/list-design-requests`;
    const params: Record<string, any> = {
        page: getParams.page,
        limit: getParams.limit
    }
    if(getParams.searchTerm && getParams.searchTerm.trim()){
        params.searchTerm = getParams.searchTerm
    }
    const response = await HttpClient.get<{
        success: boolean,
        message: string,
        data: PaginatedResponse<IDesignRequest>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response;
    }else{
        throw new Error(response.message || 'Failed to fetch list design requests')
    }
}

// tạo mới yêu cầu thiết kế
export const createDesignRequest = async(payload: DesignRequestPayload) => {
    return HttpClient.post(`${prefix}/creation-bom`, payload);
}

// Lấy chi tiết bản ghi
export const getDetailDesignRequest = async(id: string) => {
    return HttpClient.get<any, HttpResponse<IDesignRequest>>(`${prefix}/detail-design-request/${id}`)
}

// update trạng thái và ngày hoàn thành
export const updateStatusAndDate = async(id: string, payload: FormDataUpdateDesignRequest) => {
    return HttpClient.put<any>(`${prefix}/update-status-date/${id}`, payload as any);
}