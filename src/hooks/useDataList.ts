import { PaginatedResponse } from "@/services/base-service";
import { HttpResponse } from "@/types/common";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

interface FetchParams {
  page: number;
  limit: number;
  status?: string | string[];
  curatorId?: number,
  searchTerm?: string;
}

export const useDataList = <T>(
    fn: (params: FetchParams, type?: string) => Promise<HttpResponse<PaginatedResponse<T>>>,
    rowsPerPage: number = 10, 
    status?: string | string[], 
    curatorId?: number
) => {
    const [listData, setListData] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const latestFetchRef = useRef<number>(0);

    const fetchData = useCallback(async(page: number, limit: number, status?: string | string[], curatorId?: number, searchTerm?: string) => {
        setLoading(true);
        const fetchId = Date.now();
        latestFetchRef.current = fetchId;
        try {
            const res = await fn({ page: page, limit: limit, status: status, curatorId: curatorId, searchTerm: searchTerm});
            // Chặn kết quả cũ ghi đè khi debounce bị overlap
            if (latestFetchRef.current !== fetchId) return;

            const data = res.data?.data as any as T[];
            setListData(data);
            res.data?.total && setTotal(res.data.total)
        } catch (error: any) {
            if (latestFetchRef.current !== fetchId) return;
            setError(error.message);
            setListData([]);
            setTotal(0)
        }finally {
            if (latestFetchRef.current === fetchId) {
                setLoading(false);
            }
        }
    }, [fn]);

    const debounceGet = useMemo(
        () => debounce((page: number, limit: number, status?: string | string[], curatorId?: number, searchTerm?: string) => {
            fetchData(page, limit, status, curatorId, searchTerm);
        }, 500),
        [fetchData]
    )

    // Lần đầu hoặc khi page/status/curator thay đổi -> fetch ngay
    useEffect(() => {
        debounceGet.cancel(); // ngắt debounce cũ
        fetchData(page, rowsPerPage, status, curatorId);
        if(searchTerm) debounceGet(page, rowsPerPage, status, curatorId, searchTerm);
        return () => debounceGet.cancel();
  } , [page, rowsPerPage, status, curatorId, searchTerm]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    }

    return {
        listData,
        searchTerm,
        loading,
        error,
        handlePageChange,
        handleSearch,
        total,
        page,
        rowsPerPage,
        fetchData,
    }
}