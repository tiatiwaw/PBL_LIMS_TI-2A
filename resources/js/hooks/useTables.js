import { useState, useMemo, useEffect } from "react";

export function useTable({
    data,
    defaultPageSize = 10,
    filterColumn = "status",
    searchColumn = "user",
    showFilter = false,
    showSearch = false,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterValue, setFilterValue] = useState("all");

    const filteredData = useMemo(() => {
        let result = data;
        if (showFilter && filterValue !== "all") {
            result = result.filter(
                (item) => item[filterColumn] === filterValue
            );
        }
        if (showSearch && searchTerm) {
            result = result.filter((item) =>
                item[searchColumn]
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }
        return result;
    }, [
        data,
        filterValue,
        searchTerm,
        showFilter,
        showSearch,
        filterColumn,
        searchColumn,
    ]);

    const totalPages = Math.ceil(filteredData.length / defaultPageSize) || 1;

    const startIndex = (currentPage - 1) * defaultPageSize;
    const currentData = useMemo(() => {
        const endIndex = startIndex + defaultPageSize;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, startIndex, defaultPageSize]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filterValue, searchTerm]);

    return {
        currentPage,
        totalPages,
        goToPage,
        searchTerm,
        setSearchTerm,
        filterValue,
        setFilterValue,
        currentData,
        startIndex,
    };
}
