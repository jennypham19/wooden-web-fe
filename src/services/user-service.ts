import type { HttpResponse } from '@/types/common';
import { IUser } from '@/types/user';
import HttpClient from '@/utils/HttpClient';
import { Dayjs } from 'dayjs';
import { PaginatedResponse } from './base-service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/users`;

interface UserPayloadRequest {
  fullName: string,
  dob: Dayjs | null,
  role: string,
  email: string,
  password: string,
  gender: string,
  phone: string,
  work: string,
  address: string | null,
  department: string,
  avatarUrl: string,
  nameImage: string
}

export interface GetParams{
  page: number;
  limit: number;
  role?: string;
  isPermission?: boolean
  searchTerm?: string;
}

export const getCurrentUser = () => {
  return HttpClient.get<HttpResponse<IUser>>(`${API_BASE_URL}/api/auth/me`);
};

// Tạo tài khoản
export const createAccount = async(payload: UserPayloadRequest) => {
  return HttpClient.post(`${prefix}/create-user`, payload)
}

// Lấy danh sách 
export const getAccounts = async<T>(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<T>>>=> {
  const url = `${prefix}/get-list-accounts`;
  const params: Record<string, any> = {
    page: getParams.page,
    limit: getParams.limit,
  }
  if(getParams.role !== 'all'){
    params.role = getParams.role
  };
  if(getParams.searchTerm && getParams.searchTerm.trim()) {
    params.searchTerm = getParams.searchTerm
  };
  const response = await HttpClient.get<{
    success: boolean,
    message: string,
    data: PaginatedResponse<T>
  }>(url, { params });
  if(response.data && response.success && response.data){
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list user');
  }
}

// Lấy danh sách 
export const getDecentralizedAccounts = async<T>(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<T>>>=> {
  const url = `${prefix}/get-list-decentralized-accounts`;
  const params: Record<string, any> = {
    page: getParams.page,
    limit: getParams.limit,
  }
  // ✅ Chỉ thêm khi không undefined hoặc null (vẫn gửi false được)
  if (getParams.isPermission !== undefined && getParams.isPermission !== null) {
    params.isPermission = getParams.isPermission;
  }
  if(getParams.searchTerm && getParams.searchTerm.trim()) {
    params.searchTerm = getParams.searchTerm
  };
  const response = await HttpClient.get<{
    success: boolean,
    message: string,
    data: PaginatedResponse<T>
  }>(url, { params });
  if(response.data && response.success && response.data){
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list user');
  }
}

// lấy chi tiết kèm quyền
export const getDetailUserWithPermission = async(id: string) => {
  return HttpClient.get(`${prefix}/get-detail-account-with-permission/${id}`)
}