import { ICustomerInput } from "./customer";
import { FormDataDimesionProduct } from "./product";

export type FormInfoNewCustomerErrors = {
    [K in keyof ICustomerInput]?: string
}

export type FormDataDimesionProductErrors = {
    [K in keyof FormDataDimesionProduct]?: string
}