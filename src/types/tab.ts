export type CategoryType = 0 | 1;
export interface ViewModeProps{
    id: string | number,
    label: string,
    value: CategoryType,
}