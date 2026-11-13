import { HttpResponse } from "@/types/common";
import { PaginatedResponse } from "./base-service";
import { IListCompany } from "@/types/supplier";
import HttpClient from "@/utils/HttpClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/suppliers`;

export interface GetParams{
  page: number;
  limit: number;
  searchTerm?: string
}

// Lấy danh sách nhà cung cấp vật tư
export const getListCompanies = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IListCompany>>> => {
    const url = `${prefix}/list-companies-for-supplier`;
    const params: Record<string, any> = {
        page: getParams.page,
        limit: getParams.limit
    };
    if(getParams.searchTerm && getParams.searchTerm.trim()) {
        params.searchTerm = getParams.searchTerm
    }
    const response = await HttpClient.get<{
        success: boolean,
        message: string,
        data: PaginatedResponse<IListCompany>
    }>(url, { params });
    if(response.success && response.data){
        return response;
    }else{
        throw new Error(response.message || 'Failed to fetch list companies')
    }
}