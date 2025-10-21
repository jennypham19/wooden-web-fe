import { ReactNode } from 'react';
import { Box, DialogProps } from '@mui/material';
import ActionButton from '@/components/ProButton/ActionButton';
import DialogContainer from '@/components/ProDialog/DialogContainer';
import DialogContent from '@/components/ProDialog/DialogContent';
import DialogFooter from '@/components/ProDialog/DialogFooter';
import DialogHeader from '@/components/ProDialog/DialogHeader';

interface Props extends Omit<DialogProps, 'open' | 'fullScreen'> {
  dialogKey: string | null | boolean;
  handleClose: () => void;
  children: ReactNode;
  dialogTitle?: string;
  dialogContentHeight?: string | number;
  showSaveButton?: boolean;
  customButtons?: ReactNode;
  hasError?: boolean,
  isActiveFooter?:boolean,
  isCenter?:boolean,
  isActiveHeader?:boolean,
  maxWidth?: any,
  toolTip?: string,
}

const DialogComponent = ({
  dialogKey,
  handleClose,
  children,
  dialogTitle,
  dialogContentHeight = 500,
  showSaveButton = false,
  customButtons,
  hasError,
  isActiveFooter = true,
  isCenter=true,
  isActiveHeader=true,
  maxWidth,
  toolTip = dialogTitle,
  ...rest
}: Props) => {
  return (
    <DialogContainer {...rest} open={!!dialogKey} onClose={handleClose} maxWidth={maxWidth}>
      {isActiveHeader && <DialogHeader toolTip={toolTip} onClose={handleClose} title={dialogTitle || ''} marginTop={2} />}
      <DialogContent sx={{ textAlign: isCenter ? "" : "center", maxHeight: 'fit-content'}}>
        <Box sx={{ padding: 2 }}>{children}</Box>
      </DialogContent>
      {isActiveFooter && (
        <DialogFooter>
          {customButtons}
          <ActionButton actionType='cancel' onClick={handleClose}>
            Hủy
          </ActionButton>
        </DialogFooter>        
      )}

    </DialogContainer>
  );
};

export default DialogComponent;
