import { IUser } from "@/types/user";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export const INFORMATION_ACCOUNT_DATA: IUser[] = [
    {
        id: `${uuidv4()}`,
        email: 'trangkieu123@gmail.com',
        fullName: 'Đỗ Thị Mỹ Linh',
        address: 'Hà Đông, Hà Nội',
        avatarUrl: 'null',
        code: 'NV 001287',
        department: 'Bộ phận hành chính',
        dob: `${dayjs()}`,
        gender: 'female',
        nameImage: 'null',
        isActive: true,
        isReset: false,
        phone: '0982712782',
        role: 'factory_manager',
        work: 'Quản lý các nhân viên phòng ban mộc'
    },
    {
        id: `${uuidv4()}`,
        email: 'trangkieu123@gmail.com',
        fullName: 'Kiều Thị Thanh Thủy',
        address: 'Hà Đông, Hà Nội',
        avatarUrl: 'null',
        code: 'NV 001287',
        department: 'Bộ phận hành chính',
        dob: `${dayjs()}`,
        gender: 'female',
        nameImage: 'null',
        isActive: true,
        isReset: false,
        phone: '0982712782',
        role: 'factory_manager',
        work: 'Quản lý các nhân viên phòng ban mộc'
    },
    {
        id: `${uuidv4()}`,
        email: 'trangkieu123@gmail.com',
        fullName: 'Trần Thị Kiều Ân',
        address: 'Hà Đông, Hà Nội',
        avatarUrl: 'null',
        code: 'NV 001287',
        department: 'Bộ phận hành chính',
        dob: `${dayjs()}`,
        gender: 'female',
        nameImage: 'null',
        isActive: true,
        isReset: false,
        phone: '0982712782',
        role: 'factory_manager',
        work: 'Quản lý các nhân viên phòng ban mộc'
    },
    {
        id: `${uuidv4()}`,
        email: 'trangkieu123@gmail.com',
        fullName: 'Hoàng Thị Huế',
        address: 'Hà Đông, Hà Nội',
        avatarUrl: 'null',
        code: 'NV 001287',
        department: 'Bộ phận hành chính',
        dob: `${dayjs()}`,
        gender: 'female',
        nameImage: 'null',
        isActive: true,
        isReset: false,
        phone: '0982712782',
        role: 'factory_manager',
        work: 'Quản lý các nhân viên phòng ban mộc'
    },
    {
        id: `${uuidv4()}`,
        email: 'trangkieu123@gmail.com',
        fullName: 'Nguyễn Thị Thu Thủy',
        address: 'Hà Đông, Hà Nội',
        avatarUrl: 'null',
        code: 'NV 001287',
        department: 'Bộ phận hành chính',
        dob: `${dayjs()}`,
        gender: 'female',
        nameImage: 'null',
        isActive: true,
        isReset: false,
        phone: '0982712782',
        role: 'factory_manager',
        work: 'Quản lý các nhân viên phòng ban mộc'
    },
    {
        id: `${uuidv4()}`,
        email: 'trangkieu123@gmail.com',
        fullName: 'Nguyễn Thùy Trang',
        address: 'Hà Đông, Hà Nội',
        avatarUrl: 'null',
        code: 'NV 001287',
        department: 'Bộ phận hành chính',
        dob: `${dayjs()}`,
        gender: 'female',
        nameImage: 'null',
        isActive: true,
        isReset: false,
        phone: '0982712782',
        role: 'factory_manager',
        work: 'Quản lý các nhân viên phòng ban mộc'
    },
]

export const ROLE_DATA: {id: number, label: string, value: string}[] = [
    {
        id: 1,
        label: 'Quản lý cấp cao',
        value: 'admin'
    },
    {
        id: 2,
        label: 'Nhân viên',
        value: 'employee'
    },
    {
        id: 3,
        label: 'Quản lý xưởng',
        value: 'factory_manager'
    },
    {
        id: 4,
        label: 'Nhân viên kế hoạch sản xuất',
        value: 'production_planner'
    },
    {
        id: 5,
        label: 'Tổ trưởng sản xuất',
        value: 'production_supervisor'
    },
    {
        id: 6,
        label: 'Thợ mộc',
        value: 'carpenter'
    },
    {
        id: 7,
        label: 'Kiểm tra chất lượng',
        value: 'qc'
    },
    {
        id: 8,
        label: 'Quản lý kho',
        value: 'inventory_manager'
    },
    {
        id: 9,
        label: 'Kỹ thuật và thiết kế',
        value: 'technical_design'
    },
    {
        id: 10,
        label: 'Kế toán',
        value: 'accounting'
    },
]

export const DEPARTMENT_DATA: { id: string, name: string, role_id: number }[] = [

]