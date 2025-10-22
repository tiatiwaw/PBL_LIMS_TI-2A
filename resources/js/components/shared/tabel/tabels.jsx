import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchFilter from "../dashboard/searchfilter";

export default function DataTable({
    columns,
    data,
    showSearch = true,
    showFilter = false,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, endIndex);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <Card className="w-full rounded-2xl shadow-lg border-none">
            <CardHeader className="pb-0">
                <SearchFilter
                    showSearch={showSearch}
                    showFilter={showFilter}
                />
            </CardHeader>
            <CardContent className="pt-0">
                <Table className="border-separate border-spacing-y-3">
                    <TableHeader>
                        <TableRow className="bg-primary-hijauTua hover:bg-primary-hijauTua">
                            {columns.map((column, index) => (
                                <TableHead
                                    key={column.accessorKey}
                                    className={cn(
                                        "text-white font-bold",
                                        index === 0 ? "rounded-l-lg" : "",
                                        index === columns.length - 1
                                            ? "rounded-r-lg"
                                            : ""
                                    )}
                                >
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((row) => (
                            <TableRow
                                key={row.id}
                                className={cn(
                                    "font-medium cursor-pointer text-primary-hijauTua",
                                    "odd:bg-primary-hijauTua/10",
                                    "even:bg-primary-hijauTua/30",
                                    "transition-colors duration-150 ease-in-out",
                                    "hover:bg-primary-hijauTua/70 hover:text-white",
                                    "data-[state=selected]:bg-primary-hijauTua/60 data-[state=selected]:text-white"
                                )}
                            >
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={column.accessorKey}
                                        className={cn(
                                            "py-4 font-medium",
                                            index === 0 ? "rounded-l-lg" : "",
                                            index === columns.length - 1
                                                ? "rounded-r-lg"
                                                : ""
                                        )}
                                    >
                                        {column.cell
                                            ? column.cell({ row })
                                            : row[column.accessorKey]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-6 pt-4">
                <p className="text-sm text-gray-500">
                    Showing page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={16} />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                            <Button
                                key={page}
                                size="sm"
                                variant={currentPage === page ? "default" : "ghost"}
                                onClick={() => goToPage(page)}
                                className={cn(
                                    currentPage === page &&
                                    "bg-primary-hijauTua hover:bg-primary-hijauTua/90"
                                )}
                            >
                                {page}
                            </Button>
                        )
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}