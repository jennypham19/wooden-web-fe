import { HttpResponse } from "@/types/common";
import { IWorkOrder } from "@/types/order";
import { FormUpdateProduct, IProduct, PayloadEvaluationMilestone, PayloadEvaluationProduct, PayloadEvaluationWorkOrder, PayloadRequestMilestone } from "@/types/product";
import HttpClient from "@/utils/HttpClient";
import { GetParams, PaginatedResponse } from "./base-service";

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

// Send evaluation milestone
export const sendEvaluationMilestone = (id: string, payload: PayloadEvaluationMilestone) => {
    return HttpClient.put(`${prefix}/evaluation-milestone-sent/${id}`, payload)
}

// Send evaluation work order
export const sendEvaluationWorkOrder = (id: string, payload: PayloadEvaluationWorkOrder) => {
    return HttpClient.put(`${prefix}/evaluation-work-order-sent/${id}`, payload)
}

// Evaluated product
export const evaluationProduct = (id: string, payload: PayloadEvaluationProduct) => {
    return HttpClient.put(`${prefix}/evaluation-product/${id}`, payload)
}

// Lấy thông tin đánh giá sản phẩm theo id sản phẩm đã được đánh giá
export const getDataProductReviewByIdProduct = (id: string) => {
    return HttpClient.get<any, HttpResponse<IProduct>>(`${prefix}/product-review-by-id/${id}`)
}

// Lấy danh sách sản phẩm đã được hoàn thành
export const getListCompletedProducts = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<IProduct>>> => {
    const url = `${prefix}/list-completed-products`;
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
        data: PaginatedResponse<IProduct>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response;
    }else{
        throw new Error(response.message || 'Failed to fetch list completed products')
    }
}
