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
    onSave: (id: string[]) =>  void;
    excludedIds?: string[]; // 👈 danh sách đã chọn
}

const DialogChooseWorkers = (props: DialogChooseWorkersProps) => {
    const { open, onClose, onSave, excludedIds } = props;
    const { loading, page, rowsPerPage, listData, handlePageChange, total, fetchData, error } = useFetchData<IUser>(getListCapenter, 10)
    const [idChecked, setIdchecked] = useState<string[]>([]);
    const [errorCheckedAction, setErrorCheckedAction] = useState<string>('');

    const filteredList = excludedIds?.length ? listData.filter((worker) => !excludedIds.includes(worker.id)) : listData;
    const handleClose = () => {
        onClose();
        setErrorCheckedAction('');
        setIdchecked([])
    }

    /** Toggle checkbox **/
    const handleCheck = (id: string) => {
      setIdchecked((prev) => 
        prev.includes(id) ? prev.filter((item) => item !== id) // bỏ chọn
        : [...prev, id] // chọn
      )
      setErrorCheckedAction('')
    }

    const handleSave = () => {
      if(idChecked.length === 0){
        setErrorCheckedAction('Bạn phải chọn ít nhất nhân lực .')
      }
      onSave(idChecked);
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
                <Box width='100%' p={1} bgcolor='#20ac4aff'>
                  <Typography variant="subtitle2">Không tồn tại bản ghi.</Typography>
                </Box>
              )}
              {filteredList.length === 0 && (
                <Box width='100%' p={1.5} bgcolor='#20ac4aff'>
                  <Typography variant="subtitle2">Tất cả nhân lực đã được phân công.</Typography>
                </Box>
              )}
              {filteredList.map((carpenter, index) => {
                const checked = idChecked.includes(carpenter.id);
                return (
                  <Grid key={index} size={{ xs: 12, md: 4 }}>
                    <Card
                      sx={{ border: '1px solid #C0C0C0', borderRadius: 3, position: 'relative' }}
                    >
                      <Checkbox
                        checked={checked}
                        onChange={() => handleCheck(carpenter.id)}
                        sx={{ 
                          position: 'absolute', top: 8, right: 8, 
                          "&.Mui-checked": { 
                            color: checked
                              ? `2px solid ${COLORS.BUTTON}`
                              : "1px solid #C0C0C0",                             
                            borderRadius: 3
                          },
                          cursor: 'pointer',
                        }}
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
            {errorCheckedAction && (
              <Typography mt={1} fontWeight={600} fontSize='15px' color="error">{errorCheckedAction}</Typography>
            )}
            <Box mt={1.5}  display='flex' justifyContent='flex-end'>
                <Button
                    sx={{ bgcolor: COLORS.BUTTON, mr: 1}}  
                    onClick={handleSave}     
                    disabled={filteredList.length === 0}
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