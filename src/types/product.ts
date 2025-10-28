import { ProccessOrder, StatusOrder } from "@/constants/status";

export interface FormDataProducts{
    name: string,
    description: string,
    target: string
    proccess: string,
    status: string,
    managerId: string,
}
export interface IProduct{
    id: string,
    nameManager: string,
    name: string,
    description: string,
    target: string,
    proccess: ProccessOrder | null,
    status: StatusOrder | null,
    createdAt: string,
    updatedAt: string
}