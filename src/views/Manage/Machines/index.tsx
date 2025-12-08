import Page from "@/components/Page"
import { useState } from "react";
import SearchBox from "../components/SearchBox";
import { Alert, Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import { COLORS } from "@/constants/colors";
import { Add, ArrowRight } from "@mui/icons-material";
import CreateMachine from "./components/CreateMachine";
import AllListMachines from "./components/AllListMachines";
import Grid from "@mui/material/Grid2";
import { useFetchData } from "@/hooks/useFetchData";
import { IMachine } from "@/types/machine";
import { getMachines } from "@/services/machine-service";
import Backdrop from "@/components/Backdrop";
import CustomPagination from "@/components/Pagination/CustomPagination";
import ViewMachine from "./components/ViewMachine";
import CardDataMachine from "./components/CardDataMachine";
import UpdateMachine from "./components/UpdateMachine";
import { StatusMachine } from "@/constants/status";
import HandleFaulty from "./components/HandleFaulty";
import UpdateProccess from "./components/UpdateProcess";
import UpdateRepairDate from "./components/UpdateRepairDate";

const Machines = () => {
    const [openMachine, setOpenMachine] = useState<{ open: boolean, type: string }>({
        open: false,
        type: ''
    });
    const [showAll, setShowAll] = useState(false);
    const [createMachine, setCreateMachine] = useState(false);
    const [machineId, setMachineId] = useState<string | null>(null);
    const [type, setType] = useState<string>('');

    const { fetchData, listData, rowsPerPage, page, loading, error, handlePageChange, handleSearch, searchTerm, total } = useFetchData<IMachine>(getMachines, 4)

    const handleOpenAddMachine = () => {
        setCreateMachine(true)
    }

    const handleCloseAddMachine = () => {
        setCreateMachine(false)
        fetchData(page, rowsPerPage)
    }

    /* Xem chi tiết */
    const handleOpenViewMachine = (id: string) => {
        setMachineId(id);
        setOpenMachine({ open: true, type: 'view'})
    }

    const handleCloseViewMachine = () => {
        setOpenMachine({ open: false, type: 'view'})
        setMachineId(null)
    }

    /* Cập nhật */
    const handleOpenUpdateMachine = (id: string, type: string) => {
        setMachineId(id);
        setOpenMachine({ open: true, type: 'update'});
        setType(type)
    }

    const handleCloseUpdateMachine = () => {
        setOpenMachine({ open: false, type: 'update'})
        setMachineId(null);
        fetchData(page, rowsPerPage)
        setType('')
    }

    const handleShowAllListMachines = () => {
        setShowAll(true)
    }

    const handleCloseShowAllListMachines = () => {
        setShowAll(false)
    }
    return (
        <Page title="Quản lý máy móc">
            {(!createMachine && !showAll) && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên, mã, thông số, thương hiệu..."
                    >
                        <Button
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                            startIcon={<Add/>}
                            onClick={handleOpenAddMachine}
                        >
                            Tạo máy móc
                        </Button>
                    </SearchBox>
                    <Stack onClick={handleShowAllListMachines} sx={{ cursor: 'pointer' }} m={1} direction='row' display='flex' justifyContent='flex-end'>
                        <Typography fontWeight={500} variant="subtitle2">Xem thêm</Typography>
                        <ArrowRight/>
                    </Stack>
                    {listData.length === 0 && (
                        <Typography mx={2}>Không tồn tại bản ghi nào</Typography>
                    )}
                    {loading && <Backdrop open={loading}/>}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2 }} >{error}</Alert>
                    )}
                    {!loading && !error && (
                        <>
                            <Grid container spacing={2}>
                                {listData.map((machine, index) => {
                                    return(
                                        <Grid sx={{ px: 1.5 }} key={index} size={{ xs: 12, md: 6 }}>
                                            <CardDataMachine
                                                machine={machine}
                                                onViewMachine={handleOpenViewMachine}
                                                onUpdateMachine={handleOpenUpdateMachine}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            <Box my={1} display='flex' justifyContent='center'>
                                <CustomPagination
                                    page={page}
                                    count={total}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={handlePageChange}
                                />
                            </Box>                        
                        </>
                    )}

                </>
            )}
            {createMachine && (
                <CreateMachine
                    onBack={handleCloseAddMachine}
                />
            )}
            {showAll && (
                <AllListMachines
                    onBack={handleCloseShowAllListMachines}
                />
            )}
            {openMachine.open && openMachine.type === 'view' && machineId && (
                <ViewMachine
                    open={openMachine.open}
                    onClose={handleCloseViewMachine}
                    id={machineId}
                />
            )}
            {openMachine.open && openMachine.type === 'update' && type === StatusMachine.OPERATING && machineId && (
                <UpdateMachine
                    open={openMachine.open}
                    onClose={handleCloseUpdateMachine}
                    id={machineId}
                />
            )}
            {openMachine.open && openMachine.type === 'update' && type === StatusMachine.FAULTY && machineId && (
                <HandleFaulty
                    open={openMachine.open}
                    onClose={handleCloseUpdateMachine}
                    id={machineId}
                />
            )}
            {openMachine.open && openMachine.type === 'update' && type === StatusMachine.UNDER_MAINTENANCE && machineId && (
                <UpdateProccess
                    open={openMachine.open}
                    onClose={handleCloseUpdateMachine}
                    id={machineId}
                />
            )}
            {openMachine.open && openMachine.type === 'update' && type === StatusMachine.UNDER_REPAIR && machineId && (
                <UpdateRepairDate
                    open={openMachine.open}
                    onClose={handleCloseUpdateMachine}
                    id={machineId}
                />
            )}
        </Page>
    )
}
export default Machines;