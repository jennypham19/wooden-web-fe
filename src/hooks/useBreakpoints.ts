import { useMediaQuery, useTheme } from "@mui/material";

const useBreakpoints = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  return md;
}

export default useBreakpoints;
