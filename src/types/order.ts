import { ProccessOrder, StatusOrder } from "@/constants/status";
import { Dayjs } from "dayjs";
import { FormDataProducts } from "./product";

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
export interface IOrder{
    id: string,
    nameCustomer: string,
    codeOrder: string,
    name: string,
    dateOfReceipt: string,
    dateOfPayment: string,
    proccess: ProccessOrder | null,
    status: StatusOrder | null,
    amount: number,
    requiredNote: string,
    createdAt: string,
    updatedAt: string
}