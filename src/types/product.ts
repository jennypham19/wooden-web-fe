import { ProccessOrder, StatusOrder } from "@/constants/status";
import { Dayjs } from "dayjs";

// Đầu vào
export interface FormDataProducts{
    name: string,
    description: string,
    target: string
    proccess: string,
    status: string,
    managerId: string,
}

export interface FormDataRequestMilestone{
    reworkReason: string | null,
    reworkDeadline: Dayjs | null,
    reworkStartedAt: Dayjs | null
}

// Body
export interface FormUpdateProduct{
    status: string,
    nameImage: string,
    urlImage: string
}

export interface PayloadRequestMilestone{
    evaluatedStatus: string,
    reworkReason: string | null,
    reworkDeadline: string | null,
    reworkStartedAt: string | null,
    changedBy: string | null,
    changedRole: string | null,
    carpenters: { id: string }[]
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