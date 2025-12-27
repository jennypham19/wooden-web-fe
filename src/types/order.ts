import { ProccessOrder, ProccessWorkOrder, ProgressWorkOrder, StatusOrder } from "@/constants/status";
import { Dayjs } from "dayjs";
import { FormDataProducts, IProduct } from "./product";
import { IInputFile, IReferenceLink } from "./file";

// Đầu vào
export interface FormDataInputFiles{
    name: string,
    url: string
}

export interface FormDataReferenceLinks{
    url: string | null
}

export interface FormDataOrders{
    customerId: string,
    name: string,
    dateOfReceipt: Dayjs | null,
    dateOfPayment: Dayjs | null,
    proccess: string,
    status: string,
    amount: number | null,
    requiredNote: string,
    products: FormDataProducts[],
}

export interface FormDataImageStep{
    name: string,
    url: string
}

export interface FormDataStep{
    name: string,
    proccess: string,
    progress: string,
    images?: FormDataImageStep[]
}

export interface FormDataWorkMilestone{
    name: string,
    step: number | null,
    target: string,
    steps: FormDataStep[]
}

// body
export interface OrderPayloadRequest{
    customerId: string,
    codeOrder: string,
    name: string,
    dateOfReceipt: Dayjs | null | string,
    dateOfPayment: Dayjs | null | string,
    proccess: string,
    status: string,
    amount: number | null,
    requiredNote: string,
    inputFiles?: FormDataInputFiles[],
    referenceLinks?: FormDataReferenceLinks[] | null[],
    products: FormDataProducts[],
    createdBy: string | null
}

export interface WorkOderPayload{
    orderId: string | null,
    managerId: string | null,
    productId: string | null,
    workMilestone: string,
    workers: { carpenterId : string} [],
    workMilestones: FormDataWorkMilestone[]
}

export interface StepsPayload{
    proccess: string,
    progress: string,
    images: { name: string, url: string }[]
}

export interface StepPayload{
    workMilestoneId: string,
    name: string,
    proccess: string,
    progress: string,
}


// đầu ra
export interface IOrder{
    id: string,
    customer: {
        id: string,
        name: string
    },
    codeOrder: string,
    name: string,
    dateOfReceipt: string,
    dateOfPayment: string,
    proccess: ProccessOrder | null,
    status: StatusOrder | null,
    amount: number,
    requiredNote: string,
    createdAt: string,
    updatedAt: string,
    isCreatedWork: boolean,
    createdBy: string,
    reason: string,
    products: IProduct[],
    inputFiles: IInputFile[],
    referenceLinks: IReferenceLink[]
}

interface IImage{
    id: string,
    name: string,
    url: string,
    createdAt: string,
    updatedAt: string,
}

export interface IStep{
    id: string,
    name: string,
    proccess: ProccessWorkOrder | null,
    progress: ProgressWorkOrder | null,
    createdAt: string,
    updatedAt: string,
    images: IImage[]
}

export interface IWorkMilestone{
    id: string,
    name: string,
    step: string,
    target: string,
    createdAt: string,
    updatedAt: string,
    evaluatedStatus: string,
    steps: IStep[]
}

export interface IWorkOrder{
    id: string,
    workMilestone: string,
    manager: {
        id: string,
        fullName: string,
        avatarUrl: string
    },
    createdAt: string,
    updatedAt: string,
    evaluatedStatus: string,
    workers: { 
        id: string,
        fullName: string,
        avatarUrl: string
    }[];
    workMilestones: IWorkMilestone[]
}

//error
export type FormWorkMilestoneErrors = {
    [K in keyof FormDataWorkMilestone]?: string
}

export type FormStepErrors = {
    [K in keyof FormDataStep]?: string
}