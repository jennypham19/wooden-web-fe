import { HttpResponse } from "@/types/common";
import { IWorkOrder } from "@/types/order";
import { FormUpdateProduct, IProduct, PayloadRequestMilestone } from "@/types/product";
import HttpClient from "@/utils/HttpClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/products`;

// Lấy danh sách sản phẩm theo đơn hàng
export const getProductsByOrderId = (id: string) => {
    return HttpClient.get<any, HttpResponse<IProduct>>(`${prefix}/get-products-by-order/${id}`)
}

// Lấy danh sách sản phẩm theo đơn hàng và sản phẩm
export const getProductsByOrderIdAndStatus = (id: string) => {
    return HttpClient.get<any, HttpResponse<IProduct>>(`${prefix}/products-by-order-and-status/${id}`)
}

// Lấy chi tiết mốc công việc theo sản phẩm
export const getDetailWorkOrderByProduct = (id: string) => {
    return HttpClient.get<any, HttpResponse<IWorkOrder>>(`${prefix}/detail-work-order-by-product/${id}`)
}

// Update hình ảnh và trạng thái của sản phẩm
export const updateImageAndStatusProduct = (id: string, payload: FormUpdateProduct) => {
    return HttpClient.put(`${prefix}/image-and-status-product-updated/${id}`, payload)
}

// Send request milestone
export const sendRequestMilestone = (id: string, payload: PayloadRequestMilestone) => {
    return HttpClient.put(`${prefix}/request-milestone-sent/${id}`, payload)
}