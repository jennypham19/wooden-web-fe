import InputText from "@/components/InputText";
import { Box, Button, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { Add, Delete, FileUpload, ListAlt, Timeline, Upload } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import { useState } from "react";
import InputSelect from "@/components/InputSelect";
import { v4 as uuidv4 } from "uuid";
import FilesUpload from "../components/FileUpload";


const DATA_MATERIAL = [
    {
        name: 'Thép tấm 3mm',
        quantity: 10,
        unit: 'Tấm',
        unitPrice: '120,000',
        total: '1,200,000'
    },
    {
        name: 'Thép tấm 3mm',
        quantity: 13,
        unit: 'Tấm',
        unitPrice: '120,000',
        total: '1,440,000'
    }
]

const DATA_WORK_MILESTONE: { id: string, label: number, value: string}[] = [
    {
        id: uuidv4(),
        label: 1,
        value: 'one_milestone'
    },
    {
        id: uuidv4(),
        label: 2,
        value: 'two_milestone'
    },
    {
        id: uuidv4(),
        label: 3,
        value: 'three_milestone'
    },
    {
        id: uuidv4(),
        label: 4,
        value: 'four_milestone'
    },
    {
        id: uuidv4(),
        label: 5,
        value: 'five_milestone'
    }
]
const Product = () => {
    const [openBom, setOpenBom] = useState<{ open: boolean, type: string }>({
        open: false,
        type: ''
    })

    const handleOpenAddBom = () => {
        setOpenBom({ open: true, type: 'add-bom' })
    }
    
    const handleCloseAddBom = () => {
        setOpenBom({ open: false, type: 'add-bom' })
    }
    return(
        <Box mt={2}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="caption" fontWeight={500}>Tên sản phẩm</Typography>
                    <InputText
                        label=""
                        value={''}
                        type="text"
                        onChange={() => {}}
                        name=""
                        margin="dense"
                        placeholder="Nhập tên sản phẩm"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="caption" fontWeight={500}>Số lượng</Typography>
                    <InputText
                        label=""
                        value={''}
                        type="text"
                        onChange={() => {}}
                        name=""
                        margin="dense"
                        placeholder="Nhập số lượng"
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="caption" fontWeight={500}>Tài liệu thiết kế</Typography>
                    <FilesUpload
                        onFileSelect={() => {}}
                    >
                        <Typography fontSize='15px'>Kéo và thả file thiết kế vào đây</Typography>
                        <Typography variant='caption' color='text.secondary'>Hoặc click để chọn file từ thiết bị (JPG, PNG, PDF, AI)</Typography>
                    </FilesUpload>
                </Grid>
            </Grid>
            <Box mt={3} mb={1.5} display='flex' flexDirection={{ xs: 'column', md: 'row' }} justifyContent={{ xs: 'flex-start', md: 'space-between' }}>
                <Stack>
                    <ListAlt/>
                    <Typography fontSize='15px' fontWeight={500}>Bảng định mức vật tư (BOM)</Typography>
                </Stack>
                <Stack mt={{ xs: 1, md: 0 }}>
                    {/* <Button
                        startIcon={<ContentCopy/>}
                        sx={{ bgcolor: '#d6d3d3', color: '#000'}}
                    >
                        Sao chép BOM
                    </Button> */}
                    <Button
                        startIcon={<FileUpload/>}
                        sx={{ bgcolor: COLORS.BUTTON}}
                    >
                        Nhập Excel
                    </Button>
                </Stack>
            </Box>
            <TableContainer sx={{ borderRadius: 1.5, border: '1px solid #ebe5e5' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['Tên vật tư', 'Số lượng', 'Đơn vị', 'Đơn giá', 'Thành tiền', 'Thao tác'].map((header) => (
                                <TableCell key={header} sx={{ fontWeight: 700 }}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DATA_MATERIAL.map((item) => (
                            <TableRow>
                                <TableCell sx={{ py: 1 }}>{item.name}</TableCell>
                                <TableCell>10</TableCell>
                                <TableCell>Tấm</TableCell>
                                <TableCell>120.000</TableCell>
                                <TableCell>1.200.000</TableCell>
                                <TableCell></TableCell>     
                            </TableRow>
                        ))}
                        {openBom.open && openBom.type === 'add-bom' && (
                            <TableRow>
                                <TableCell>
                                    <InputText
                                        sx={{ width: '100%'}}
                                        label=""
                                        name=""
                                        value={''}
                                        onChange={() => {}}
                                        type="text"
                                        from="add-bom"
                                        placeholder="Nhập tên vật tư"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box width={65}>
                                        <InputText
                                            onlyPositiveNumber
                                            label=""
                                            name=""
                                            value={''}
                                            onChange={() => {}}
                                            type="text"
                                            from="add-bom"
                                            placeholder="0"
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box width={70}>
                                        <InputText
                                            label=""
                                            name=""
                                            value={''}
                                            onChange={() => {}}
                                            type="text"
                                            from="add-bom"
                                            placeholder="ĐV"
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box width={70}>
                                        <InputText
                                            label=""
                                            name=""
                                            value={''}
                                            onChange={() => {}}
                                            type="text"
                                            from="add-bom"
                                            placeholder="Giá"
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box width={70}>
                                        <InputText
                                            label=""
                                            name=""
                                            value={''}
                                            onChange={() => {}}
                                            type="text"
                                            from="add-bom"
                                            placeholder="Tổng"
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={handleCloseAddBom}>
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow onClick={handleOpenAddBom} sx={{ cursor: 'pointer' }}>
                            <TableCell colSpan={6} sx={{ gap: 1, display: 'flex', flexDirection: 'row' }}>
                                <IconButton sx={{ borderRadius: '50%', border: '1px solid #c2bebe', width: 20, height: 20 }}><Add /></IconButton>
                                <Typography fontSize='14px' fontWeight={500}>Thêm vật tư</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={3} mb={1.5} display='flex' flexDirection={{ xs: 'column', md: 'row' }} justifyContent={{ xs: 'flex-start', md: 'space-between' }}>
                <Stack>
                    <Timeline/>
                    <Typography fontSize='15px' fontWeight={500}>Các mốc sản xuất (dự kiến)</Typography>
                </Stack>
            </Box>
        </Box>
    )
}

export default Product;