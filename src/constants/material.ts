export interface Material {
  id: string;

  // Thông tin định danh
  materialCode: string;                                 // Mã vật tư
  batchCode?: string | null;                            // Mã lô
  materialName: string;                                 // Tên vật tư
  urgencyLevel?: "high" | "medium" | "low" | null;             // Mức độ cấp bách
  alertMessage?: string | null;                         // Thông báo cảnh báo

  // Thông tin kỹ thuật
  description?: string | null;                          // Mô tả
  technicalSpecifications?: string | null;              // Thông số kỹ thuật - Quy cách kỹ thuật
  materialStandard?: string | null;                     // Tiêu chuẩn vật tư    
  wasteRate?: number | null;                            // Tỷ lệ hao hụt (%)
  notes?: string | null;                                // Ghi chú vật tư

  // Phân loại
  categoryId?: string;                                   // Id loại vật tư
  categoryName: string;                                 // Tên loại vật tư
  iconCategory?: string | null;                         // Icon loại vật tư

  // Đơn vị tính
  unitId?: string;                                       // Id đơn vị tính
  unitCode?: string;                                    // Mã đơn vị tính
  unitName: string;                                     // Tên đơn vị tính

  // Thông tin tồn kho
  minimumStock: number;                                 // Mức tồn kho tối thiểu
  actualStock: number;                                  // Tồn kho thực tế

  // Giá nhập
  lastPurchasePrice: number;                            // Giá nhập lần cuối

  // Nhà cung cấp chính
  primarySupplier?: {
    supplierId: string;                                 // Id nhà cung cấp
    supplierCode?: string;                               // Mã nhà cung cấp           
    supplierName: string;                               // Tên nhà cung cấp
    description?: string | null;                        // Mô tả nhà cung cấp
    address?: string | null;                            // Địa chỉ nhà cung cấp
  } | null;

  // Trạng thái
  stockStatus: "in_stock" | "low_stock" | "low_in_stock" | "out_of_stock";   // Trạng thái tồn kho
  status?: "active" | "inactive";                            // Trạng thái vật tư

  // Thời gian
  createdAt?: string;                                       // Thời gian tạo
  updatedAt?: string;                                       // Thời gian cập nhật
}