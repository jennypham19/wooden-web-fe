
// input
export interface StaffFeedbackItem {
  rating: number | null;
  customerFeedbackText: string;
  staffNote?: string | null
}

// body
export interface PayloadFeedbackDraft {
    rating: number | null;
    customerFeedbackText: string;
    staffNote: string | null,
    orderId: string, 
    productId: string,
    customerId: string,
    staffId: string | null,
    feedbackDate: string
}

export interface PayloadVideoFile{
    name: string,
    url: string,
    duration: number,
}

export interface PayloadImagesFile{
    name: string,
    url: string
}

export interface PayloadFeedbackConfirmed {
    rating: number | null;
    customerFeedbackText: string;
    orderId: string, 
    productId: string,
    customerId: string,
    staffId: string | null,
    feedbackDate: string,
    images: PayloadImagesFile[],
    video: PayloadVideoFile
}


// output
export interface IFeedback{
    id: string,
    order: string,
    product: string,
    nameImageProduct: string,
    urlImageProduct: string,
    statusProduct: string
    customer: string,
    phoneCustomer: string,
    staff: string,
    rating: number,
    customerFeedbackText: string,
    staffNote: string | null,
    feedbackDate: string,
    status: string,
    images: { name: string, url: string }[],
    video: { name: string, url: string, duration: number },
    createdAt: string,
    updatedAt: string,
}