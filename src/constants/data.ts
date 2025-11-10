export const ROLE_DATA: {id: number, label: string, value: string}[] = [
    {
        id: 1,
        label: 'Nhân viên',
        value: 'employee'
    },
    {
        id: 2,
        label: 'Quản lý xưởng',
        value: 'factory_manager'
    },
    {
        id: 3,
        label: 'Nhân viên kế hoạch sản xuất',
        value: 'production_planner'
    },
    {
        id: 4,
        label: 'Tổ trưởng sản xuất',
        value: 'production_supervisor'
    },
    {
        id: 5,
        label: 'Thợ mộc',
        value: 'carpenter'
    },
    {
        id: 6,
        label: 'Kiểm tra chất lượng',
        value: 'qc'
    },
    {
        id: 7,
        label: 'Quản lý kho',
        value: 'inventory_manager'
    },
    {
        id: 8,
        label: 'Kỹ thuật và thiết kế',
        value: 'technical_design'
    },
    {
        id: 9,
        label: 'Kế toán',
        value: 'accounting'
    },
]

export const GENDER: { id: number, value: string, label: string }[] = [
    {
        id: 1,
        value: 'female',
        label: 'Nữ'
    },
    {
        id: 2,
        value: 'male',
        label: 'Nam'
    }
]

export const WORK_DATA: { id: number, value: string, label: string, role: string }[] = [
    { id: 1, value: 'Tiếp nhận yêu cầu từ khách hàng hoặc đại lý.', label: 'Tiếp nhận yêu cầu từ khách hàng hoặc đại lý.', role: 'employee' },
    { id: 2, value: 'Tạo Đơn hàng (Sales Order) gồm: sản phẩm, số lượng, mô tả, deadline.', label: 'Tạo Đơn hàng (Sales Order) gồm: sản phẩm, số lượng, mô tả, deadline.', role: 'employee' },
    { id: 3, value: 'Đính kèm yêu cầu kỹ thuật hoặc file mẫu (nếu có).', label: 'Đính kèm yêu cầu kỹ thuật hoặc file mẫu (nếu có).', role: 'employee' },
    { id: 4, value: 'Theo dõi trạng thái đơn hàng (thiết kế → sản xuất → hoàn thành).', label: 'Theo dõi trạng thái đơn hàng (thiết kế → sản xuất → hoàn thành).', role: 'employee' },
    { id: 5, value: 'Gửi phản hồi khách hàng khi có thay đổi tiến độ.', label: 'Gửi phản hồi khách hàng khi có thay đổi tiến độ.', role: 'employee' },
    { id: 6, value: 'Nhận yêu cầu từ phòng kinh doanh.', label: 'Nhận yêu cầu từ phòng kinh doanh.', role: 'technical_design'},
    { id: 7, value: 'Thiết kế bản vẽ kỹ thuật (AutoCAD, SketchUp).', label: 'Thiết kế bản vẽ kỹ thuật (AutoCAD, SketchUp).', role: 'technical_design'},
    { id: 8, value: 'Tạo định mức vật tư (BOM – Bill of Materials) cho từng sản phẩm.', label: 'Tạo định mức vật tư (BOM – Bill of Materials) cho từng sản phẩm.', role: 'technical_design'},
    { id: 9, value: 'Cập nhật thông số kỹ thuật và file đính kèm vào hệ thống.', label: 'Cập nhật thông số kỹ thuật và file đính kèm vào hệ thống.', role: 'technical_design'},
    { id: 10, value: 'Hỗ trợ kỹ thuật trong quá trình sản xuất (xử lý lỗi hoặc thay đổi thiết kế).', label: 'Hỗ trợ kỹ thuật trong quá trình sản xuất (xử lý lỗi hoặc thay đổi thiết kế).', role: 'technical_design'},
    { id: 11, value: 'Cập nhật bản vẽ hoàn công (“as-built”) sau khi hoàn thành sản xuất.', label: 'Cập nhật bản vẽ hoàn công (“as-built”) sau khi hoàn thành sản xuất.', role: 'technical_design'},
    { id: 12, value: 'Nhận bản vẽ và BOM từ bộ phận kỹ thuật.', label: 'Nhận bản vẽ và BOM từ bộ phận kỹ thuật.', role: 'production_planner'},
    { id: 13, value: 'Tạo Lệnh sản xuất (Work Order) cho từng đơn hàng.', label: 'Tạo Lệnh sản xuất (Work Order) cho từng đơn hàng.', role: 'production_planner'},
    { id: 14, value: 'Lập kế hoạch sản xuất theo năng lực máy móc, công nhân và thời gian.', label: 'Lập kế hoạch sản xuất theo năng lực máy móc, công nhân và thời gian.', role: 'production_planner'},
    { id: 15, value: 'Theo dõi tiến độ, điều phối giữa các xưởng và bộ phận QC.', label: 'Theo dõi tiến độ, điều phối giữa các xưởng và bộ phận QC.', role: 'production_planner'},
    { id: 16, value: 'Gửi báo cáo tiến độ cho Quản lý xưởng / Factory Manager.', label: 'Gửi báo cáo tiến độ cho Quản lý xưởng / Factory Manager.', role: 'production_planner'},
    { id: 17, value: 'Nhận lệnh sản xuất từ Planner.', label: 'Nhận lệnh sản xuất từ Planner.', role: 'production_supervisor'},
    { id: 18, value: 'Phân công công việc cho công nhân theo từng công đoạn (cắt, ghép, sơn, lắp ráp).', label: 'Phân công công việc cho công nhân theo từng công đoạn (cắt, ghép, sơn, lắp ráp).', role: 'production_supervisor'},
    { id: 19, value: 'Theo dõi năng suất, cập nhật tiến độ và tình trạng sản xuất.', label: 'Theo dõi năng suất, cập nhật tiến độ và tình trạng sản xuất.', role: 'production_supervisor'},
    { id: 20, value: 'Báo cáo lỗi kỹ thuật hoặc thiếu vật tư cho Planner/Technical.', label: 'Báo cáo lỗi kỹ thuật hoặc thiếu vật tư cho Planner/Technical.', role: 'production_supervisor'},
    { id: 21, value: 'Kiểm tra bước đầu chất lượng bán thành phẩm trước khi chuyển sang QC.', label: 'Kiểm tra bước đầu chất lượng bán thành phẩm trước khi chuyển sang QC.', role: 'production_supervisor'},
    { id: 22, value: 'Nhận công việc từ Tổ trưởng.', label: 'Nhận công việc từ Tổ trưởng.', role: 'carpenter'},
    { id: 23, value: 'Thực hiện gia công theo bản vẽ kỹ thuật và quy trình sản xuất.', label: 'Thực hiện gia công theo bản vẽ kỹ thuật và quy trình sản xuất.', role: 'carpenter'},
    { id: 24, value: 'Cập nhật trạng thái công việc (đang làm / hoàn thành).', label: 'Cập nhật trạng thái công việc (đang làm / hoàn thành).', role: 'carpenter'},
    { id: 25, value: 'Báo lỗi hoặc thiếu vật tư.', label: 'Báo lỗi hoặc thiếu vật tư.', role: 'carpenter'},
    { id: 26, value: 'Nhận sản phẩm từ xưởng để kiểm tra chất lượng.', label: 'Nhận sản phẩm từ xưởng để kiểm tra chất lượng.', role: 'qc'},
    { id: 27, value: 'Đối chiếu với bản vẽ và yêu cầu kỹ thuật.', label: 'Đối chiếu với bản vẽ và yêu cầu kỹ thuật.', role: 'qc'},
    { id: 28, value: 'Ghi nhận kết quả QC (đạt / không đạt) và nguyên nhân lỗi.', label: 'Ghi nhận kết quả QC (đạt / không đạt) và nguyên nhân lỗi.', role: 'qc'},
    { id: 29, value: 'Chuyển sản phẩm đạt QC sang kho, hoặc yêu cầu xưởng sửa lỗi.', label: 'Chuyển sản phẩm đạt QC sang kho, hoặc yêu cầu xưởng sửa lỗi.', role: 'qc'},
    { id: 30, value: 'Nhập vật tư, theo dõi tồn kho.', label: 'Nhập vật tư, theo dõi tồn kho.', role: 'inventory_manager'},
    { id: 31, value: 'Xuất vật tư cho lệnh sản xuất theo yêu cầu từ phòng kế hoạch sản xuất.', label: 'Xuất vật tư cho lệnh sản xuất theo yêu cầu từ phòng kế hoạch sản xuất.', role: 'inventory_manager'},
    { id: 32, value: 'Nhập thành phẩm đạt QC.', label: 'Nhập thành phẩm đạt QC.', role: 'inventory_manager'},
    { id: 33, value: 'Quản lý vị trí lưu kho, lô sản phẩm, serial hoặc batch number.', label: 'Quản lý vị trí lưu kho, lô sản phẩm, serial hoặc batch number.', role: 'inventory_manager'},
    { id: 34, value: 'Báo cáo tồn kho định kỳ.', label: 'Báo cáo tồn kho định kỳ.', role: 'inventory_manager'},
    { id: 35, value: 'Tổng hợp chi phí sản xuất (nguyên vật liệu, nhân công, khấu hao).', label: 'Tổng hợp chi phí sản xuất (nguyên vật liệu, nhân công, khấu hao).', role: 'accounting'},
    { id: 36, value: 'Theo dõi năng suất công nhân, tính lương và thưởng.', label: 'Theo dõi năng suất công nhân, tính lương và thưởng.', role: 'accounting'},
    { id: 37, value: 'Báo cáo lợi nhuận, giá thành sản phẩm, chi phí theo đơn hàng.', label: 'Báo cáo lợi nhuận, giá thành sản phẩm, chi phí theo đơn hàng.', role: 'accounting'},
    { id: 38, value: 'Xuất hóa đơn, chứng từ khi đơn hàng hoàn tất.', label: 'Xuất hóa đơn, chứng từ khi đơn hàng hoàn tất.', role: 'accounting'},
    { id: 39, value: 'Giám sát toàn bộ quy trình từ đơn hàng đến xuất kho.', label: 'Giám sát toàn bộ quy trình từ đơn hàng đến xuất kho.', role: 'factory_manager'},
    { id: 40, value: 'Phê duyệt các lệnh sản xuất và đơn hàng lớn.', label: 'Phê duyệt các lệnh sản xuất và đơn hàng lớn.', role: 'factory_manager'},
    { id: 41, value: 'Theo dõi báo cáo tiến độ, lỗi, năng suất, chi phí.', label: 'Theo dõi báo cáo tiến độ, lỗi, năng suất, chi phí.', role: 'factory_manager'},
    { id: 42, value: 'Ra quyết định điều phối hoặc tối ưu quy trình sản xuất.', label: 'Ra quyết định điều phối hoặc tối ưu quy trình sản xuất.', role: 'factory_manager'},
]

export const MAINTENANCE_PERCENTAGE_DATA: { id: number, label: string, value: string }[] = [
    { id: 1, label: '0%', value: '0%' },
    { id: 2, label: '25%', value: '25%' },
    { id: 3, label: '50%', value: '50%' },
    { id: 4, label: '100%', value: '100%' },
]

export const STATUS_MACHINE_DATA: { id: number, label: string, value: string }[] = [
    { id: 1, label: 'Đang hoạt động', value: 'operating' },
    { id: 2, label: 'Tạm dừng', value: 'paused' },
    { id: 3, label: 'Ngừng hoạt động', value: 'stopped' },
    { id: 4, label: 'Đang bảo trì', value: 'under_maintenance' },
    { id: 5, label: 'Đang sửa chữa', value: 'under_repair' },
    { id: 6, label: 'Lỗi/ Hỏng', value: 'faulty' }
]