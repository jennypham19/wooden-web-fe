import { ProccessOrder, StatusOrder } from "@/constants/status";
import { Dayjs } from "dayjs";

// Đầu vào
export interface FormDataProducts{
    name: string,
    description: string,
    target: string
    proccess: string,
    status: string,
    managerId: string,
    lenghtProduct: number | null,
    widthProduct: number | null,
    heightProduct: number | null
}

export interface FormDataRequestMilestone{
    reworkReason: string | null,
    reworkDeadline: Dayjs | null,
    reworkStartedAt: Dayjs | null
}

// Body
export interface FormUpdateProduct{
    status: string,
    nameImage: string,
    urlImage: string
}

export interface PayloadRequestMilestone{
    evaluatedStatus: string,
    reworkReason: string | null,
    reworkDeadline: string | null,
    reworkStartedAt: string | null,
    changedBy: string | null,
    changedRole: string | null,
    carpenters: { id: string }[]
}

export interface PayloadEvaluationMilestone{
    evaluatedStatus: string,
    evaluationDescription: string,
    changedBy: string | null,
    changedRole: string | null,
    carpenters: { id: string }[]
}

export interface PayloadEvaluationWorkOrder{
    evaluatedStatusWorkOrder: string,
    evaluationDescriptionWorkOrder: string,
    changedBy: string | null,
    changedRole: string | null,
    carpenters: { id: string }[]
}

export interface PayloadEvaluationProduct{
    reviews: {
        overallQuality: number | null,
        aesthetics: number | null,
        customerRequirement: number | null,
        satisfaction: number | null
    },
    comment: string | null,
    averageScore: number | string,
    orderId: string
}

// Đầu ra
export interface IProduct{
    id: string,
    manager: string,
    name: string,
    description: string,
    target: string,
    proccess: ProccessOrder | null,
    status: StatusOrder | null,
    createdAt: string,
    updatedAt: string,
    isCreated: boolean,
    nameImage: string,
    urlImage: string,
    isEvaluated: boolean,
    completedDate: string | null,
    feedbackStatus: string,
    dimension: {
        length: number,
        width: number,
        height: number
    }
    order: {
        id: string,
        codeOrder: string,
        name: string,
        dateOfReceipt: string,
        dateOfPayment: string,
        proccess: string | ProccessOrder,
        status: string | StatusOrder,
        amount: number,
        requiredNote: string,
        isCreatedWork: boolean,
        isEvaluated: boolean,
        createdAt: string,
        updatedAt: string,
        feedbackStatus: string,
        customer: {
            id: string,
            name: string,
            phone: string,
            address: string,
            amountOfOrders: number,
            createdAt: string,
            updatedAt: string,
        }
    },
    feedback: {
        id: string,
        rating: number | null,
        customerFeedbackText: string,
        staffNote: string | null,
        feedbackDate: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        images: {
            id: string,
            name: string,
            url: string
        }[],
        video: {
            id: string,
            name: string,
            url: string,
            duration: number
        }
    }
}

export interface IProductReview{
    id: string,
    overallQuality: number,
    aesthetics: number,
    customerRequirement: number,
    satisfaction: number,
    comment: string | null,
    averageScore: string,
    createdAt: string,
    updatedAt: string
}