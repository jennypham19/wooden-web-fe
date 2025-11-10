import { BomPayloadRequest, IBOM } from "@/types/bom";
import HttpClient from "@/utils/HttpClient";
import { GetParams, PaginatedResponse } from "./base-service";
import { HttpResponse } from "@/types/common";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/boms`;

// Lưu BOM
export const createBom = async(payload: BomPayloadRequest) => {
    return HttpClient.post(`${prefix}/create-bom`, payload);
}

// Lấy danh sách
export const getBoms = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IBOM>>> => {
    const url = `${prefix}/get-list-boms`;
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
        data: PaginatedResponse<IBOM>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response;
    }else{
        throw new Error(response.message || 'Failed to fetch list boms')
    }
}