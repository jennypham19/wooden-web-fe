import { IMenu } from "./permission";

export interface IUser{
    id: string,
    email: string,
    password: string
    fullName: string,
    address: string,
    avatarUrl: string,
    code: string,
    createdAt?: string,
    department: string,
    dob: string,
    gender: string,
    nameImage: string,
    isActive: boolean,
    isReset: boolean,
    phone: string,
    role: string,
    updatedAt?: string,
    work: string,
    isPermission: boolean,
    permissions: IMenu[],
    isDeleted: number,
    isDefaultType: number
}