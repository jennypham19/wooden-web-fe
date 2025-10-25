import { HttpResponse } from "@/types/common";
import { PaginatedResponse } from "./base-service";
import HttpClient from "@/utils/HttpClient";
import { FormDataActions } from "@/views/Manage/Permission/Action";
import { IAction, IMenu } from "@/types/permission";
import { FormDataMenus } from "@/views/Manage/Permission/Menu";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/permissions`;

interface UserPermissionResquest{
  userId: string,
  permissions: IMenu[]
}

export interface GetParams{
    page: number;
    limit: number;
    searchTerm?: string;
}

export type ActionsResponse = PaginatedResponse<IAction>;

// Lấy danh sách thao tác, chức năng, quyền, quyền kèm chức năng
export const getObjectPermisstion = async <T>(getParams: GetParams, type: string) : Promise<HttpResponse<PaginatedResponse<T>>> => {
  const url = `${prefix}/${type}`;
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
    data: PaginatedResponse<T>
  }>(url, { params });
  if(response.data && response.success && response.data) {
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list user')
  }
}
/* 1. Thao tác */
//Lấy danh sách
export const getActions = (params: GetParams) => {
    return HttpClient.get<any, HttpResponse<ActionsResponse>>(`${prefix}/actions`, { params })
}

// Thêm mới
export const createAction = (payload: FormDataActions) => {
    return HttpClient.post<FormDataActions, HttpResponse>(`${prefix}/create-action`, payload)
}

// Cập nhật
export const updateAction = (id: number, payload: { name: string} ) => {
    return HttpClient.put<any, HttpResponse<IAction>>(`${prefix}/update-action/${id}`, payload)
}

/* 2. Chức năng */
//Tạo chức năng
export const createMenu = (payload: FormDataMenus) => {
    return HttpClient.post<FormDataMenus, HttpResponse>(`${prefix}/create-menu`, payload)
}

//Lấy chi tiết chức năng
export const getMenu = (id: number) => {
    return HttpClient.get<any, HttpResponse<IMenu>>(`${prefix}/menu/${id}`)
}

// Cập nhật chức năng
export const updateMenu = (id: number, payload: FormDataMenus ) => {
    return HttpClient.put<any, HttpResponse<IMenu>>(`${prefix}/update-menu/${id}`, payload)
}

// Lấy danh sách chức năng kèm thao tác
export const getAllModules = () => {
    return HttpClient.get<any, HttpResponse<IMenu>>(`${prefix}/menu-with-action`);
}

/* 3. Quyền */
// Tạo quyền
export const createUserRole = (data: UserPermissionResquest) => {
  const endpoint = `${prefix}/create-user-permission`;
  return HttpClient.post<any, HttpResponse>(endpoint, data)
}

// Chỉnh sửa quyền
export const updateUserRole = (data: UserPermissionResquest) => {
  const endpoint = `${prefix}/update-user-permission`;
  return HttpClient.put<any, HttpResponse>(endpoint,data)
}
