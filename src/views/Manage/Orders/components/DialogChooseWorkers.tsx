import { useState } from "react";
import { Alert, Avatar, Box, Button, Card, Checkbox, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Backdrop from "@/components/Backdrop";
import DialogComponent from "@/components/DialogComponent";
import { useFetchData } from "@/hooks/useFetchData";
import { getListCapenter } from "@/services/user-service";
import { IUser } from "@/types/user";
import { COLORS } from "@/constants/colors";


interface DialogChooseWorkersProps{
    open: boolean,
    onClose: () => void;
}

const DialogChooseWorkers = (props: DialogChooseWorkersProps) => {
    const { open, onClose } = props;
    const { loading, page, rowsPerPage, listData, handlePageChange, total, fetchData, error } = useFetchData<IUser>(getListCapenter, 10)

    const handleClose = () => {
        onClose()
    }
    return (
      <DialogComponent
        dialogKey={open}
        handleClose={handleClose}
        dialogTitle='Phân công nhân lực'
        isActiveFooter={false}
      >
        {loading && <Backdrop open={loading} />}
        {error && !loading && (
          <Alert severity='error' sx={{ my: 2 }}>
            {error}
          </Alert>
        )}
        {!loading && !error && (
          <>
            <Grid container spacing={2}>
              {listData.length === 0 && (
                <Box width='100%' p={1.5} bgcolor='red'>
                  <Typography variant="subtitle2">Không tồn tại bản ghi</Typography>
                </Box>
              )}
              {listData.map((carpenter, index) => {
                return (
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card
                      sx={{ border: '1px solid #C0C0C0', borderRadius: 3, position: 'relative' }}
                    >
                      <Checkbox
                        sx={{ position: 'absolute', top: 8, right: 8, borderRadius: '50%' }}
                      />
                      <Box
                        flexDirection='column'
                        gap={1}
                        mb={1}
                        mt={1.5}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      >
                        <Avatar
                          src={carpenter.avatarUrl}
                          sx={{ borderRadius: '50%', width: 80, height: 80 }}
                        />
                        <Typography fontWeight={600}>{carpenter.fullName}</Typography>
                        <Typography>{carpenter.code}</Typography>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
             
            </Grid>
            <Box mt={1.5}  display='flex' justifyContent='flex-end'>
                <Button
                    sx={{ bgcolor: COLORS.BUTTON, mr: 1}}       
                >
                    Hoàn thành
                </Button>
                <Button
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                    onClick={handleClose}
                >
                    Đóng
                </Button>
            </Box>             
          </>
        )}
        <Card sx={{ position: 'relative' }}>
          <Checkbox sx={{ position: 'absolute' }} />
          <Box></Box>
        </Card>
      </DialogComponent>
    );
}

export default DialogChooseWorkers;