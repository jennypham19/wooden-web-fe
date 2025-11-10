export interface FormDataMaterials{
    name: string,
    unit: string,
    amount: number | null,
    note: string
}

export interface MaterialsPayloadRequest{
    code: string,
    name: string,
    unit: string,
    amount: number | null,
    note: string,
    imageUrl: string,
    nameUrl: string
}

export interface IMaterial{
    id: string,
    code: string,
    name: string,
    unit: string,
    amount: number | null,
    note: string,
    imageUrl: string,
    nameUrl: string,
    createdAt?: string,
    updatedAt?: string
}