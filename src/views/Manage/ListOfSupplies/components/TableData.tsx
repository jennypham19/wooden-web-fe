import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

interface TableProps<T> {
    label: string,
    height?: number,
    array: string[],
    data: T[],
    renderRow: (item: T, index: number) => React.ReactNode;
    colSpan: number,
    minWidth?: number,
}

const TableData = <T,>({
    label,
    height = 50,
    array,
    data,
    renderRow,
    colSpan,
    minWidth
} : TableProps<T>) => {
    return (
        <TableContainer sx={{ overflowX: "auto" }} component={Paper}>
            <Table stickyHeader aria-label={label} sx={{ minWidth }}>
                <TableHead>
                    <TableRow sx={{ height: height}}>
                        {array.map((header, index) => (
                            <TableCell key={index} sx={{ fontWeight: 700, bgcolor: '#F4F6F0'}}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={colSpan} align="center">
                                Không tồn tại bản ghi nào
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => renderRow(item, index))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableData;