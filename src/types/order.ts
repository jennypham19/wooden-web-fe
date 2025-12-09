import { ProccessOrder, StatusOrder } from "@/constants/status";
import { Dayjs } from "dayjs";
import { FormDataProducts, IProduct } from "./product";

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
    products: IProduct[]
}