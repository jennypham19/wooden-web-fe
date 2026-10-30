import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// 1. Định nghĩa kiểu dữ liệu cho Typescript
interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

// 2. Mock data theo đúng dữ liệu trong ảnh của bạn
const data: ChartDataItem[] = [
  { name: 'Gỗ tự nhiên xẻ', value: 48, color: '#1B3F16' },     // Xanh đậm
  { name: 'Gỗ CN & Ván dăm', value: 28, color: '#43582D' },    // Xanh rêu
  { name: 'Phụ kiện & Keo sơn', value: 24, color: '#E28723' }, // Cam
];

export const StorageDonutChart: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
      
      {/* KHU VỰC VẼ BIỂU ĐỒ DONUT */}
      <div style={{ width: '160px', height: '160px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}  // Độ rộng vòng trống phía trong
              outerRadius={75}  // Độ rộng vòng ngoài cùng
              paddingAngle={0}
              dataKey="value"
              startAngle={180}   // Bắt đầu vẽ từ góc 9 giờ
              endAngle={-180}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Chữ hiển thị ở chính giữa biểu đồ */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>100%</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>Lưu kho</div>
        </div>
      </div>

      {/* KHU VỰC TỰ CUSTOM LEGEND (DANH SÁCH BÊN PHẢI) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', fontSize: '14px' }}>
            {/* Chấm màu + Tên */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '200px' }}>
              <span style={{
                width: '10px',
                height: '10px',
                backgroundColor: item.color,
                borderRadius: '50%',
                display: 'inline-block'
              }} />
              <span style={{ color: '#333' }}>{item.name}</span>
            </div>
            {/* Tỷ lệ phần trăm */}
            <span style={{ fontWeight: '500', color: '#000', marginLeft: 'auto' }}>{item.value}%</span>
          </div>
        ))}
      </div>

    </div>
  );
};