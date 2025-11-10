import { DataMachinesRequest } from "@/types/machine";
import HttpClient from "@/utils/HttpClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/machines`;

// Tạo mới máy móc
export const createMachine = async(payload: DataMachinesRequest) => {
    const url = `${prefix}/create-machine`;
    return HttpClient.post(url, payload);
}