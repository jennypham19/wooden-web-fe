import { HttpResponse } from "@/types/common";
import HttpClient from "@/utils/HttpClient";
import { GetParams, PaginatedResponse } from "./base-service";
import { IOrder, OrderPayloadRequest, StepPayload, StepsPayload, WorkOderPayload } from "@/types/order";
import { IUser } from "@/types/user";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/orders`;


interface GetParamsOrders {
    page: number,
    limit: number,
    searchTerm?: string,
    isEvaluated?: any,
}

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

// update tiến độ và trạng thái của step
export const updateStep = async(id: string, payload: StepsPayload) => {
    return HttpClient.put(`${prefix}/step-updated/${id}`, payload as any)
}

// thêm mới step
export const createStep = async(payload: StepPayload) => {
    return HttpClient.post(`${prefix}/step-created`, payload)
}

// update proccess đơn hàng
export const updateProccessOder = async(id: string, payload: { proccess: string }) => {
    return HttpClient.patch(`${prefix}/proccess-order-updated/${id}`, payload as any)
}

// update đơn hàng
export const updateDateAndReasonOrder = async(id: string, payload: { dateOfPayment: string | null, reason: string, manager: IUser | null }) => {
    return HttpClient.put(`${prefix}/order-updated/${id}`, payload as any);
}

// Lấy danh sách có tiến độ là 75%
export const getOrdersWithProccess = async(getParams: GetParamsOrders): Promise<HttpResponse<PaginatedResponse<IOrder>>> => {
    const url = `${prefix}/orders-with-proccess`;
    const params: Record<string, any> = {
        page: getParams.page,
        limit: getParams.limit
    }
    if(getParams.searchTerm && getParams.searchTerm.trim()){
        params.searchTerm = getParams.searchTerm
    }
    if(getParams.isEvaluated !== 'all' && getParams.isEvaluated !== undefined && getParams.isEvaluated !== null){
        params.isEvaluated = getParams.isEvaluated
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

// Lấy danh sách theo id quản lý
export const getOrdersByIdManager = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IOrder>>> => {
    const url = `${prefix}/list-orders-by-manager`;
    const params: Record<string, any> = {
        page: getParams.page,
        limit: getParams.limit,
        id: getParams.id,
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

// Lấy danh sách theo id quản lý
export const getOrdersWithWorkByIdManager = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IOrder>>> => {
    const url = `${prefix}/list-orders-with-work-by-manager`;
    const params: Record<string, any> = {
        page: getParams.page,
        limit: getParams.limit,
        id: getParams.id,
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
