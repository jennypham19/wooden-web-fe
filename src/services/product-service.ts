import { HttpResponse } from "@/types/common";
import { IProduct } from "@/types/product";
import HttpClient from "@/utils/HttpClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/products`;

// Lấy danh sách sản phẩm theo đơn hàng
export const getProductsByOrderId = (id: string) => {
    return HttpClient.get<any, HttpResponse<IProduct>>(`${prefix}/get-products-by-order/${id}`)
}