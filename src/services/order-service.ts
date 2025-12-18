import { HttpResponse } from "@/types/common";
import HttpClient from "@/utils/HttpClient";
import { GetParams, PaginatedResponse } from "./base-service";
import { IOrder, OrderPayloadRequest, WorkOderPayload } from "@/types/order";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/orders`;

// Tạo đơn hàng
export const createOrder = (payload: OrderPayloadRequest) => {
    return HttpClient.post(`${prefix}/create-order`, payload)
}

// Lấy danh sách
export const getOrders = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IOrder>>> => {
    const url = `${prefix}/get-list-orders`;
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
        data: PaginatedResponse<IOrder>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response;
    }else{
        throw new Error(response.message || 'Failed to fetch list orders')
    }
}

// Lấy chi tiết đơn hàng
export const getDetailOrder = (id: string) => {
    return HttpClient.get<HttpResponse<IOrder>>(`${prefix}/detail-order/${id}`)
}

// Lưu tạo mới công việc
export const saveOrderWork = (payload: WorkOderPayload) => {
    return HttpClient.post(`${prefix}/save-work-order`, payload)
}

// Lấy danh sách đơn hàng theo id carpenter
export const getOrdersByCarpenter = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IOrder>>> => {
    const url = `${prefix}/list-orders-by-carpenter`;
    const params: Record<string, any> = {
        page: getParams.page,
        limit: getParams.limit,
        id: getParams.id
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
        data: PaginatedResponse<IOrder>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response;
    }else{
        throw new Error(response.message || 'Failed to fetch list orders')
    }
}
