import { PriorityDesignRequest, StatusDesignRequest } from "@/constants/status"
import { Dayjs } from "dayjs"

export interface FormDataInputFiles{
    name: string,
    url: string
}

export interface FormDataReferenceLinks{
    url: string | null
}

export interface FormDataTechnicalSpecification{
    length: number | null,
    width: number | null,
    height: number | null,
    weight: number | null, 
    material: string,
    color: string,
    note: string
}

export interface FormDataDesignRequets{
    title: string,
    orderId: string,
    productId: string,
    priority: string,
    status: string,
    dueDate: Dayjs | null,
    description: string,
    specialRequirement: string,
}

export interface DesignRequestPayload{
    requestCode: string,
    title: string,
    orderId: string,
    productId: string,
    customerId: string,
    curatorId: string | null,
    priority: string,
    status: string,
    dueDate: Dayjs | null,
    description: string,
    specialRequirement: string,
    inputFiles?: FormDataInputFiles[],
    referenceLinks?: FormDataReferenceLinks[] | null[]
    technicalSpecification: FormDataTechnicalSpecification
}

export interface IInputFile{
    id: string,
    name: string,
    url: string,
    createdAt: string,
    updatedAt: string
}

export interface IReferenceLink{
    id: string,
    name: string,
    url: string,
    createAt: string,
    updatedAt: string
}

export interface ITechnicalSpecification{
    id: string,
    length: number,
    width: number,
    height: number,
    weight: number,
    material: string,
    color: string,
    note: string,
    createdAt: string,
    updatedAt: string
}

export interface IDesignRequest{
    id: string,
    requestCode: string,
    orderName: string,
    productName: string,
    customerName: string,
    curatorName: string,
    title: string,
    description: string,
    inputFiles: IInputFile[],
    referenceLinks: IReferenceLink[],
    dueDate: string,
    completedDate: string,
    priority: string | PriorityDesignRequest | null,
    status: string | StatusDesignRequest | null,
    specialRequirement: string,
    createdAt: string,
    updatedAt: string,
    technicalSpecification: ITechnicalSpecification
}