import { HttpResponse } from "@/types/common";
import HttpClient from "@/utils/HttpClient";
import { FormDataCustomer } from "@/views/Manage/Customers/components/DialogAddCustomer";
import { PaginatedResponse } from "./base-service";
import { ICustomer } from "@/types/customer";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/customers`;

export interface GetParams{
  page: number;
  limit: number;
  searchTerm?: string
}

export const createCustomer = (payload: FormDataCustomer) => {
  return HttpClient.post(`${prefix}/create-customer`, payload);
}

// Lấy danh sách
export const getCustomers = async(getParams: GetParams): Promise<HttpResponse<PaginatedResponse<ICustomer>>> => {
  const url = `${prefix}/get-list-customers`;
  const params: Record<string, any> = {
    page: getParams.page,
    limit: getParams.limit,
  }
  if(getParams.searchTerm && getParams.searchTerm.trim()) {
    params.searchTerm = getParams.searchTerm
  }
  const response = await HttpClient.get<{
    success: boolean,
    message: string,
    data: PaginatedResponse<ICustomer>
  }>(url,  { params });
  if(response.data && response.success && response.data) {
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list customers')
  }
}

// Chỉnh sửa khách hàng
export const updateCustomer = (id: string, payload: FormDataCustomer) => {
  return HttpClient.put(`${prefix}/update-customer/${id}`, payload);
}

// Xóa khách hàng
export const deleteCustomer = (id: string) => {
  return HttpClient.delete(`${prefix}/delete-customer/${id}`)
}