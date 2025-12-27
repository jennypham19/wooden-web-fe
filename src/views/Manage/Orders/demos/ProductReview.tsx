import { Box, Typography, Alert } from '@mui/material';
import { Milestone, MilestoneItem } from './MilestoneItem';

const milestones: Milestone[] = [
  {
    id: 1,
    title: 'Mốc 1: Lên ý tưởng',
    placeholder: 'Đánh giá mốc 1',
    status: 'APPROVED'
  },
  {
    id: 2,
    title: 'Mốc 2: Làm mộc',
    placeholder: 'Đánh giá mốc 2',
    status: 'REWORK',
    reworkReason: 'Sai kích thước theo bản vẽ'
  },
  {
    id: 3,
    title: 'Mốc 3: Sơn màu và đánh bóng',
    placeholder: 'Đánh giá mốc 3',
    status: 'PENDING'
  },
  {
    id: 4,
    title: 'Mốc 4: Lắp ráp và chuẩn bị',
    placeholder: 'Đánh giá mốc 4',
    status: 'PENDING'
  }
];

export default function ProductReview() {
  let lockNext = false;

  return (
    <Box>
      <Typography fontWeight={600} mb={1}>
        Thông tin công việc
      </Typography>

      <Alert severity="warning" sx={{ mb: 2 }}>
        ⚠️ Sản phẩm đang có mốc cần làm lại
      </Alert>

      {milestones.map((m) => {
        const locked = lockNext;
        if (m.status === 'REWORK') lockNext = true;

        return (
          <MilestoneItem
            key={m.id}
            milestone={m}
            locked={locked}
          />
        );
      })}
    </Box>
  );
}
