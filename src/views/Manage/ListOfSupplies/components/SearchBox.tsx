import InputSearch from "@/components/SearchBar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface SearchBoxProps{
    children?: ReactNode,
    onSearch: (data: string) => void;
    initialValue: string;
    placeholder?: string;
}
const SearchBox = ({
    children,
    onSearch,
    initialValue,
    placeholder = 'Tìm kiếm',
} : SearchBoxProps) => {
    return (
        <Box bgcolor='#FFFFFF' display='flex' justifyContent={{ xs: 'flex-start', md: 'space-between'}} flexDirection={{ xs: 'column', md: 'row'}}>
            <Box display='flex' flexDirection='row' sx={{ width: { xs: '100%', md: '50%'}}}>
                <Box width='100%'>
                    <InputSearch
                        onSearch={onSearch}
                        initialValue={initialValue}
                        placeholder={placeholder}
                        colorIcon="#000"
                        color="#000"
                    />
                </Box>
            </Box>
            {children}
        </Box>
    )
}

export default SearchBox;