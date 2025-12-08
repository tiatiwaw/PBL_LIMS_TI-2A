import { useState, useMemo } from "react";
import { extractYears, createDateFilter } from "@/utils/report-helpers";

export const useReportFilters = (dataSources = [], dateFields = []) => {
    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("all");

    const availableYears = useMemo(() => {
        const allDates = dataSources.flatMap((source, idx) => {
            const field = dateFields[idx] || "created_at";
            return source.map((item) => item[field]).filter(Boolean);
        });

        return extractYears(allDates);
    }, [dataSources, dateFields]);

    const dateFilter = useMemo(
        () => createDateFilter(selectedYear, selectedMonth),
        [selectedYear, selectedMonth]
    );

    const clearFilters = () => {
        setSelectedYear("all");
        setSelectedMonth("all");
    };

    const hasActiveFilters = selectedYear !== "all" || selectedMonth !== "all";

    const isYearlyView = selectedYear === "all";

    return {
        selectedYear,
        selectedMonth,
        availableYears,
        dateFilter,
        hasActiveFilters,
        isYearlyView,
        setSelectedYear,
        setSelectedMonth,
        clearFilters,
    };
};
