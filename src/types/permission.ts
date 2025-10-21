export interface IAction {
    id: number,
    code: string,
    name: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface IMenu {
    id: number,
    code: string,
    name: string,
    parentCode?: string,
    parentName?: string,
    path?: string,
    icon?: string | null
    createdAt?: string,
    updatedAt?: string,
    actions?: IAction[],
    children?: IMenu[]
}

export interface IPermission {
    id: number,
    name: string,
    createdAt?: string,
    updatedAt?: string,
    permissions: IMenu[]
}