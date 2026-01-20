import { PaginatedResponse } from "@/services/base-service"
import { HttpResponse } from "@/types/common"
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface GetParams<K>{
    page: number,
    limit: number,
    filters?: K
}

export const useGetData = <T, K>(
    fn: (params: GetParams<K>) => Promise<HttpResponse<PaginatedResponse<T>>>,
    rowsPerPage: number = 10,
) => {
    const [listData, setListData] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<K>({} as K);

    const latestFetchRef = useRef<number>(0);
    
    const fetchData = useCallback(async(page: number, limit: number, filters?: K) => {
        setLoading(true);
        const fetchId = Date.now();
        latestFetchRef.current = fetchId;
        try {
            const res = await fn({ page: page, limit: limit, filters: filters});
            // Chặn kết quả cũ ghi đè khi debounce bị overlap
            if (latestFetchRef.current !== fetchId) return;
            const data = res.data?.data as any as T[];
            setListData(data);
            const total = res.data?.total as any as number;
            setTotal(total)
        } catch (error: any) {
            if (latestFetchRef.current !== fetchId) return;
            setError(error.message);
            setListData([]);
            setTotal(0)   
        } finally {
            if (latestFetchRef.current === fetchId) {
                setLoading(false);
            }
        }
    },[fn]);

    const debounceGet = useMemo(
        () => debounce((page: number, limit: number, filters?: K) => {
            fetchData(page, limit, filters);
        }, 500),
        [fetchData]
    )

    // Lần đầu hoặc khi page/status/curator thay đổi -> fetch ngay
    useEffect(() => {
        // debounceGet.cancel(); // ngắt debounce cũ
        fetchData(page, rowsPerPage);
        // if(filters) debounceGet(page, rowsPerPage, filters);
        // return () => debounceGet.cancel();
    } , [page, rowsPerPage]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleSearch = (filters: K) => {
        setPage(1)
        setFilters(filters)
        if(filters) debounceGet(1, rowsPerPage, filters);
    }

    return {
        listData,
        filters,
        loading,
        error,
        handlePageChange,
        handleSearch,
        total,
        page,
        rowsPerPage,
        fetchData,
        setFilters
    }
}