import { HttpResponse } from "@/types/common";
import HttpClient from "@/utils/HttpClient";
import { PaginatedResponse } from "./base-service";
import { ICustomer } from "@/types/customer";
import { Dayjs } from "dayjs";
import { IOrder } from "@/types/order";
import { FormDataProducts } from "@/types/product";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/orders`;

export interface OrderPayloadRequest{
    customerId: string,
    codeOrder: string,
    name: string,
    dateOfReceipt: Dayjs | null | string,
    dateOfPayment: Dayjs | null | string,
    proccess: string,
    status: string,
    amount: number | null,
    requiredNote: string,
    products: FormDataProducts[]
}

interface GetParams {
    page: number,
    limit: number,
    searchTerm?: string,
    status?: string
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
