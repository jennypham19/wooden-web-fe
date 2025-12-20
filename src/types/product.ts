import { ProccessOrder, StatusOrder } from "@/constants/status";

// Đầu vào
export interface FormDataProducts{
    name: string,
    description: string,
    target: string
    proccess: string,
    status: string,
    managerId: string,
}

// Body
export interface FormUpdateProduct{
    status: string,
    nameImage: string,
    urlImage: string
}

// Đầu ra
export interface IProduct{
    id: string,
    manager: string,
    name: string,
    description: string,
    target: string,
    proccess: ProccessOrder | null,
    status: StatusOrder | null,
    createdAt: string,
    updatedAt: string,
    isCreated: boolean,
    nameImage: string,
    urlImage: string
}