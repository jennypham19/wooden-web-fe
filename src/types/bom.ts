import { FormDataMaterials, IMaterial, MaterialsPayloadRequest } from "./material";

export interface BomPayloadRequest{
    code: string,
    orderId: string,
    productId: string,
    amount: number | null,
    userId: string | undefined,
    materials: MaterialsPayloadRequest[]
}

export interface FormDataBoms{
    orderId: string,
    productId: string,
    name: string,
    amount: number | null,
    materials: FormDataMaterials[]
}

export interface IBOM{
    id: string,
    code: string,
    amount: string,
    nameProduct: string,
    nameOrder: string,
    createdAt?: string,
    updatedAt?: string,
    user: {
        id: string,
        fullName: string
    },
    materials: IMaterial[]
}