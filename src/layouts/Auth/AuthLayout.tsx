import { createTheme, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Stack from '@mui/material/Stack';


export default function AuthLayout() {
  const theme = createTheme({
    components: {
      MuiButton: {
        defaultProps: {
          size: 'large',
        },
      },
    },
  });
  return (
    <Stack direction='column' justifyContent='space-between'>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
    </Stack>
  );
}
