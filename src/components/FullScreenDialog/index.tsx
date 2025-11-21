import React from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  DialogProps,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { COLORS } from "@/constants/colors";

// Transition cho dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogProps extends Omit<DialogProps, "open"> {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode; // để thêm button footer
}

const FullScreenDialog: React.FC<FullScreenDialogProps> = ({
  open,
  title,
  onClose,
  children,
  actions,
  ...props
}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      {...props}
    >
      {/* Header */}
      <AppBar sx={{ position: "relative", bgcolor: COLORS.BUTTON, height: 50 }}>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant="body1" component="div">
            {title || "Dialog"}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ flex: 1 }}>{children}</Box>

      {/* Actions Footer (nếu có) */}
      {actions && <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>{actions}</Box>}
    </Dialog>
  );
};

export default FullScreenDialog;
