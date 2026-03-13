export interface ICustomer{
    id: string;
    name: string;
    phone: string;
    type: string,
    title?: string,
    address?: string,
    requiredNote?: string,
    amountOfOrders?: number;
    createdAt?: string;
    updatedAt?: string
}

export interface ICustomerInFuni{
    id: string,
    name: string,
    phone: string,
    type: string
    title?: string,
    address?: string,
    requiredNote?: string,
    amountOfOrder?: number,
    createdAt?: string,
    updatedAt?: string,
}