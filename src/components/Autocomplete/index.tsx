import { PaginatedResponse } from "@/services/base-service";
import { GetParams } from "@/services/customer-service";
import { HttpResponse } from "@/types/common";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import avatar from "@/assets/images/users/avatar-1.png"

export interface AutocompleteProps<T>{
  label?: string;
  placeholder?: string;
  fetchOptions: (getParams: GetParams) => Promise<HttpResponse<PaginatedResponse<T>>>;
  getOptionLabel: (option: T) => string;
  getRenderOption: (option: T) => React.ReactNode;
  onChange: (value: T | null) => void;
  getOptionKey: (option: T) => string | number;
  debounceTime?: number;
  page?: number
}

export default function AutocompleteComponent<T>(props: AutocompleteProps<T>){
    const { label, placeholder, fetchOptions, getOptionLabel, onChange, debounceTime = 400, page = 1, getRenderOption, getOptionKey } = props;
    const [options, setOptions] = useState<T[]>([]); 
    const [loading, setLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState<T | null>(null)

    const search = async (search: string) => {
        if (!search || search.trim().length < 2) {
            setOptions([]);
            setIsSearch(false);
            return;
        }
            setLoading(true);
            setIsSearch(true);
        try {
            const res = await fetchOptions({ page: page, limit: 12, searchTerm: search });
            const newData = (res.data?.data || []) as T[];
            setOptions(newData);
        } catch (err) {
            console.error(err);
            setOptions([]);
        }finally{
            setLoading(false);
        }
    };

    const debounceSearch = useMemo(
        () => debounce((searchTerm: string) => search(searchTerm), debounceTime),
        [debounceTime]
    );

    useEffect(() => {
        return() => {
            debounceSearch.cancel();
        };
    }, [debounceSearch])

    return(
        <Autocomplete
            options={options}
            filterOptions={(x) => x}
            value={value || null}
            inputValue={inputValue}
            getOptionLabel={getOptionLabel}
            clearOnBlur={false}
            isOptionEqualToValue={(option, val) => getOptionKey(option) === getOptionKey(val)}
            onInputChange={(event, newValue, reason) => {
                if (reason === "input") {
                    setInputValue(newValue);
                    debounceSearch(newValue);
                }

                if (reason === "reset") {
                    setInputValue(newValue);
                }

                if (reason === "clear") {
                    setOptions([]);
                    setIsSearch(false);
                    setInputValue("");
                    setValue(null);
                }
            }}
            onChange={(event, newValue) => {
                setValue(newValue);
                setInputValue(newValue ? getOptionLabel(newValue) : "");
                onChange(newValue);
            }}
            loading={loading}
            noOptionsText={isSearch && options.length === 0 ? "Không tồn tại bản ghi nào" : "Nhập để tìm kiếm"}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading && <CircularProgress size={18} />}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
            renderOption={(props, option) => {
                return(
                    <Box
                        component='li'
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...props}
                    >
                        <img
                            alt=""
                            loading="lazy"
                            width="20"
                            src={avatar}
                        />
                        {getRenderOption ? getRenderOption(option) : getOptionLabel(option)}
                    </Box>
                )
            }}
        />
    )
}