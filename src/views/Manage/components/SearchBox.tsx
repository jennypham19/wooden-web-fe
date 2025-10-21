import InputSearch from "@/components/SearchBar";
import { IStatus } from "@/types/status";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

interface SearchBoxProps{
    children?: ReactNode,
    onSearch: (data: string) => void;
    initialValue: string;
    placeholder?: string;
    from?: string;
    status?: any;
    listStatus?: IStatus[];
    onChangeStatus?: (value: any) => void;
    isPermission?: boolean
}
const SearchBox = ({
    children,
    onSearch,
    initialValue,
    placeholder = 'Tìm kiếm',
    from,
    status,
    listStatus,
    onChangeStatus,
    isPermission = false
} : SearchBoxProps) => {
    return (
        <Box py={1.5} borderTop='2px solid #d3d3d3ff' bgcolor='#FFFFFF' display='flex' justifyContent={{ xs: 'flex-start', md: 'space-between'}} flexDirection={{ xs: 'column', md: 'row'}}>
            <Box display='flex' flexDirection='row' px={4} sx={{ width: isPermission ? "100%" : { xs: '100%', md: '50%'}}}>
                <Box width='100%'>
                    <InputSearch
                        onSearch={onSearch}
                        initialValue={initialValue}
                        placeholder={placeholder}
                        colorIcon="#000"
                        color="#000"
                    />
                </Box>
                {from && (
                        <Box ml={2} sx={{ width: { xs: '100%', md: 200}}}>
                            <FormControl fullWidth
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid #000",
                                    borderRadius: "10px",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid #000",
                                    },
                                }}
                            >
                                <InputLabel sx={{ fontSize: '14px', mt: 0.5}} id='status-label'>Trạng thái</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    label='Tiến độ'
                                    name="status"
                                    value={status}
                                    onChange={(event: SelectChangeEvent<any>) => {
                                        if(onChangeStatus){
                                            onChangeStatus(event.target.value)
                                        }
                                    }}
                                >
                                    {listStatus?.map((item, index) => {
                                        return(
                                            <MenuItem key={index} value={item.value}>
                                                {item.label}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                )}
            </Box>
            {children && (
                <Box display='flex' justifyContent={{ xs: 'center', md: 'flex-end'}} mt={{ xs: 1.5, md: 0}} px={4}>
                    {children}
                </Box>
            )}
        </Box>
    )
}

export default SearchBox;