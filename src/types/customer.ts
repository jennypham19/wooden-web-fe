export interface ICustomer{
    id: string;
    name: string;
    phone: string;
    address: string,
    amountOfOrders: number;
    createdAt: string;
    updatedAt: string
}

export interface ICustomerInFuni{
    id: string,
    name: string,
    email: string,
    phone: string,
    isRead: boolean,
    createdAt?: string,
    updatedAt?: string,
    title: string,
    status: number,
    requiredNote: string
}