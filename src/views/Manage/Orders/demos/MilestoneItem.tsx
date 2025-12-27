import {
  Box,
  Typography,
  TextField,
  IconButton,
  Collapse,
  Stack,
  Chip,
  Alert,
  Fade
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LockIcon from '@mui/icons-material/Lock';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';

export type MilestoneStatus = 'PENDING' | 'APPROVED' | 'REWORK';

export interface Milestone {
  id: number;
  title: string;
  placeholder: string;
  status: MilestoneStatus;
  reworkReason?: string;
}

interface Props {
  milestone: Milestone;
  locked?: boolean;
}

export function MilestoneItem({ milestone, locked }: Props) {
  const [open, setOpen] = useState(true);

  const statusColor =
    milestone.status === 'APPROVED'
      ? 'success'
      : milestone.status === 'REWORK'
      ? 'error'
      : 'default';

  return (
    <Box mb={2}>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontWeight={600}>
            {milestone.title}
          </Typography>

          {locked && <LockIcon fontSize="small" color="disabled" />}
          {milestone.status === 'REWORK' && (
            <ReplayIcon fontSize="small" color="error" />
          )}
          {milestone.status === 'APPROVED' && (
            <CheckCircleIcon fontSize="small" color="success" />
          )}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            size="small"
            label={
              milestone.status === 'APPROVED'
                ? 'Đạt'
                : milestone.status === 'REWORK'
                ? 'Cần làm lại'
                : 'Chờ đánh giá'
            }
            color={statusColor}
          />

          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
          >
            <KeyboardArrowDownIcon
              sx={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: '0.3s'
              }}
            />
          </IconButton>
        </Stack>
      </Stack>

      {/* BODY */}
      <Collapse in={open}>
        <Fade in={open}>
          <Box mt={1}>
            {milestone.status === 'REWORK' && (
              <Alert severity="error" sx={{ mb: 1 }}>
                <b>Lý do làm lại:</b> {milestone.reworkReason}
              </Alert>
            )}

            {locked && (
              <Alert severity="warning" sx={{ mb: 1 }}>
                Mốc này bị khóa do mốc trước chưa đạt
              </Alert>
            )}

            <TextField
              fullWidth
              placeholder={milestone.placeholder}
              disabled={locked || milestone.status === 'APPROVED'}
            />
          </Box>
        </Fade>
      </Collapse>
    </Box>
  );
}
