import {
  AssignmentOutlined,
  BuildOutlined,
  DrawOutlined,
  InventoryOutlined,
} from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';

const stats = [
  { label: 'Yêu cầu thiết kế', value: 14, icon: <AssignmentOutlined fontSize='large' /> },
  { label: 'BOM đã tạo', value: 8, icon: <InventoryOutlined fontSize='large' /> },
  { label: 'Bản vẽ hoàn công', value: 5, icon: <DrawOutlined fontSize='large' /> },
  { label: 'Yêu cầu hỗ trợ', value: 3, icon: <BuildOutlined fontSize='large' /> },
];

export default function Dashboard() {
  return (
    <Box>
      <Typography variant='h5' fontWeight={600} mb={3}>
        Tổng quan phòng Thiết kế & Kỹ thuật
      </Typography>

      <Grid container spacing={2}>
        {stats.map((item) => (
          <Grid key={item.label} item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                boxShadow: 2,
              }}
            >
              {item.icon}
              <Box>
                <Typography variant='h6'>{item.value}</Typography>
                <Typography color='text.secondary'>{item.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant='h6' gutterBottom>
            Biểu đồ tiến độ thiết kế (demo)
          </Typography>
          <Typography color='text.secondary'>[Tích hợp Recharts hoặc Chart.js ở đây]</Typography>
        </Paper>
      </Box>
    </Box>
  );
}
