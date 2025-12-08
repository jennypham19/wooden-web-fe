import { StatusMachine } from "@/constants/status";
import { Dayjs } from "dayjs";

export interface FormDataMachines{
    name: string,
    code: string,
    brand: string,
    weight: string,
    dimensions: string,
    power: string,
    maintenancePercentage?: string,
    status: string,
    description: string,
    reason?: string,
    maintenanceDate?: null | Dayjs,
    completionDate?: null | Dayjs ,
    purchaseDate: Dayjs | null,
    warrantyExpirationDate: Dayjs | null ,
    startAgainDate?: null | Dayjs 
}

export interface DataMachinesRequest{
    name: string,
    code: string,
    brand: string,
    weight: string,
    dimensions: string,
    power: string,
    maintenancePercentage?: string,
    status: string,
    description: string,
    imageUrl: string,
    nameUrl: string,
    reason?: string,
    maintenanceDate?: null | string,
    completionDate?: null | string ,
    purchaseDate: string | null,
    warrantyExpirationDate: string | null ,
    startAgainDate?: null | string 
}

export interface IMachine {
    id: string,
    name: string,
    code: string,
    brand: string,
    weight: string,
    dimensions: string,
    power: string,
    maintenancePercentage: string,
    status: StatusMachine | null,
    maintenanceDate: string,
    completionDate: string,
    repairedDate: string,
    purchaseDate: string,
    warrantyExpirationDate: string,
    description: string,
    reason: string,
    startAgainDate: string,
    imageUrl: string,
    nameUrl: string,
    createdAt: string,
    updatedAt: string,
}

export interface FormDataStatusMachine{
    status: string,
    reason: string,
    maintenanceDate: null | Dayjs,
    completionDate: null | Dayjs,
    repairedDate: null | Dayjs,
    startAgainDate: null | Dayjs,
    maintenancePercentage: string | null,
}

export interface DataStatusMachinePayload{
    status: string,
    startAgainDate: string | null,
    repairedDate: string | null,
    maintenanceDate: string | null,
    reason: string | null,
    maintenancePercentage: string | null,
}
