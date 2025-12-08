import { Alert, Box, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import React, { useState } from "react";
import { Block, BuildCircle, CheckCircle, Error, Filter, HomeRepairService, PauseCircle } from "@mui/icons-material";
import { useFetchData } from "@/hooks/useFetchData";
import { IMachine } from "@/types/machine";
import { getMachines } from "@/services/machine-service";
import Tabs from "../../components/Tabs";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import CardDataMachine from "./CardDataMachine";
import CustomPagination from "@/components/Pagination/CustomPagination";

interface AllListMachinesProps{
    onBack: () => void;
}

const DataStatus: {id: number, value: string, label: string, icon: React.ReactNode}[] = [
  {
    id: 1,
    value: 'all',
    label: 'Tất cả',
    icon: <Filter/>
  },
  {
    id: 2,
    value: 'operating',
    label: 'Máy móc ổn định',
    icon: <CheckCircle color="success"/>
  },
  {
    id: 3,
    value: 'faulty',
    label: 'Máy gặp sự cố',
    icon: <Error color="error"/>
  },
  {
    id: 4,
    value: 'paused',
    label: 'Máy đang dừng hoạt động',
    icon: <PauseCircle color="warning"/>
  },
  {
    id: 5,
    value: 'under_maintenance',
    label: 'Máy đang bảo dưỡng',
    icon: <BuildCircle color="info"/>
  },
  {
    id: 6,
    value: 'under_repair',
    label: 'Máy đang sửa chữa',
    icon: <HomeRepairService color="secondary"/>
  },
  {
    id: 7,
    value: 'stopped',
    label: 'Máy không vận hành',
    icon: <Block color="disabled"/>
  },
];

const AllListMachines = (props: AllListMachinesProps) => {
    const { onBack } = props;
    const [viewMode, setViewMode] = useState<string>('all');
    const { fetchData, listData, rowsPerPage, page, loading, error, handlePageChange, total } = useFetchData<IMachine>(getMachines, 4, viewMode);

    return(
        <Box>
            <Box py={0.5} bgcolor='#fff' borderTop='1px solid #dbd8d8ff'>
                <NavigateBack
                    title="Quản lý máy móc"
                    onBack={onBack}
                />
            </Box>
            <Box m={2}>
                <Tabs
                    data={DataStatus}
                    viewMode={viewMode}
                    onChange={setViewMode}
                />
            </Box>
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
                                        onViewMachine={() => {}}
                                        onUpdateMachine={() => {}}
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
        </Box>
    )
}

export default AllListMachines;