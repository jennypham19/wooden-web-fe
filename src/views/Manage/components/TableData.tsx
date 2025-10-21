import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

interface TableProps<T> {
    label: string,
    height?: number,
    array: string[],
    data: T[],
    renderRow: (item: T, index: number) => React.ReactNode;
    colSpan: number,
}

const TableData = <T,>({ 
    label, 
    height = 50,
    array,
    data,
    renderRow,
    colSpan
} : TableProps<T>) => {
    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label={label}>
                <TableHead>
                    <TableRow sx={{ height: height}}>
                        {array.map((header, index) => (
                            <TableCell key={index} align="center" sx={{ fontWeight: 700, bgcolor: '#a6cfebff'}}>{header}</TableCell>
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