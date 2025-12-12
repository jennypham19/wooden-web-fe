import { ProccessOrder, StatusOrder } from "@/constants/status";
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
    products: FormDataProducts[]
}

export interface FormDataImageStep{
    name: string,
    url: string
}

export interface FormDataStep{
    name: string,
    proccess: string,
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
    products: FormDataProducts[]
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
    products: IProduct[],
    inputFiles: IInputFile[],
    referenceLinks: IReferenceLink[]
}

//error
export type FormWorkMilestoneErrors = {
    [K in keyof FormDataWorkMilestone]?: string
}

export type FormStepErrors = {
    [K in keyof FormDataStep]?: string
}