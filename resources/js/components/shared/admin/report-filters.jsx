import React from 'react';
import { Calendar, Filter, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MONTHS } from '@/utils/constant/report';

export const ReportHeader = ({
    title,
    subtitle,
    selectedYear,
    selectedMonth,
    availableYears = [],
    onYearChange,
    onMonthChange,
    onClearFilters,
    onExport
}) => {
    const hasActiveFilters = selectedYear !== 'all' || selectedMonth !== 'all';

    return (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div>
                <h1 className="text-2xl font-bold text-[#02364B] tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm text-slate-500 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <Select value={selectedYear} onValueChange={onYearChange}>
                    <SelectTrigger className="w-full sm:w-[140px] bg-slate-50 border-slate-200">
                        <Calendar className="w-4 h-4 mr-2 text-[#024D60]" />
                        <SelectValue placeholder="Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Tahun</SelectItem>
                        {availableYears.map(year => (
                            <SelectItem key={year} value={String(year)}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={selectedMonth} onValueChange={onMonthChange}>
                    <SelectTrigger className="w-full sm:w-[150px] bg-slate-50 border-slate-200">
                        <Filter className="w-4 h-4 mr-2 text-[#024D60]" />
                        <SelectValue placeholder="Bulan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Bulan</SelectItem>
                        {MONTHS.map((month, idx) => (
                            <SelectItem key={idx} value={String(idx)}>
                                {month}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClearFilters}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                )}

                <Button
                    onClick={onExport}
                    className="gap-2 bg-[#024D60] hover:bg-[#02364B] text-white shadow-md shadow-[#024D60]/20"
                >
                    <Download size={16} /> Ekspor
                </Button>
            </div>
        </div>
    );
};