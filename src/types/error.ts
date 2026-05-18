import { ICustomerInput } from "./customer";

export type FormInfoNewCustomerErrors = {
    [K in keyof ICustomerInput]?: string
}