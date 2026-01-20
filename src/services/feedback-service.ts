import { HttpResponse } from "@/types/common";
import { IFeedback, PayloadFeedbackConfirmed, PayloadFeedbackDraft } from "@/types/feedback";
import HttpClient from "@/utils/HttpClient";
import { PaginatedResponse } from "./base-service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/feedbacks`;

export interface FeedbackObject{
    orderCode: string,
    rating: number | null,
    status: string
}
export interface FeedbackParams{
    page: number,
    limit: number,
    filters?: FeedbackObject
}

// Lưu phản hồi ở trạng thái Lưu nháp
export const saveFeedbackDraft = (payload: PayloadFeedbackDraft) => {
    return HttpClient.post(`${prefix}/feedback-draft-save`, payload) 
}

// Lưu phản hồi ở trạng thái xác nhận phản hồi
export const saveFeedbackConfirmed = (payload: PayloadFeedbackConfirmed) => {
    return HttpClient.post(`${prefix}/feedback-confirmed-save`, payload)
}

// Lấy danh sách
export const getFeedbacks = async(getParams: FeedbackParams): Promise<HttpResponse<PaginatedResponse<IFeedback>>> => {
    const url = `${prefix}/list-feedbacks`;
    const params: Record<string, any> = {
        page: getParams.page,
        limit: getParams.limit,
        ...(getParams.filters || {})
    }
    const response = await HttpClient.get<{
        success: boolean,
        message: string,
        data: PaginatedResponse<IFeedback>
    }>(url, { params });
    if(response.data && response.success && response.data){
        return response;
    }else{
        throw new Error(response.message || 'Failed to fetch list feedbacks')
    }    
}