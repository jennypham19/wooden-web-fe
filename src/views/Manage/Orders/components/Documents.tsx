import { Box, Divider, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';

export default function Documents() {
  const docs = [
    'Quy chuẩn kỹ thuật lắp ráp',
    'Tiêu chuẩn vật liệu gỗ',
    'Hướng dẫn kiểm tra sản phẩm',
  ];

  return (
    <Box>
      <Typography variant='h5' fontWeight={600} mb={3}>
        Tài liệu & Hướng dẫn
      </Typography>
      <List component={Paper}>
        {docs.map((doc) => (
          <ListItemButton key={doc}>
            <ListItemText primary={doc} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
