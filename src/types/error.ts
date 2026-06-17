import { ICustomerInput } from "./customer";
import { FormDataDeletedImageStep, FormDataStorageOrder } from "./order";
import { FormDataDimesionProduct } from "./product";

export type FormInfoNewCustomerErrors = {
    [K in keyof ICustomerInput]?: string
}

export type FormDataDimesionProductErrors = {
    [K in keyof FormDataDimesionProduct]?: string
}

// order
export type FormDataStorageOrderErrors = {
    [K in keyof FormDataStorageOrder]?: string
}

export type FormDataDeletedImageStepErrors = {
    [K in keyof FormDataDeletedImageStep]?: string
}