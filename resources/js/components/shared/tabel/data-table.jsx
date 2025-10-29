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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchFilter from "../dashboard/searchfilter";

export function DataTableCard({ className, ...props }) {
    return (
        <Card
            className={cn("w-full rounded-2xl shadow-lg border-none", className)}
            {...props}
        />
    );
}

export function DataTableHeader({
    showSearch,
    showFilter,
    filterOptions,
    searchTerm,
    onSearchChange,
    filterValue,
    onFilterChange,
}) {
    return (
        <CardHeader className="pb-0">
            <SearchFilter
                showSearch={showSearch}
                showFilter={showFilter}
                filterOptions={filterOptions}
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                filterValue={filterValue}
                onFilterChange={onFilterChange}
            />
        </CardHeader>
    );
}

export function DataTableContent({
    columns,
    data,
    startIndex = 0,
    onEdit,
    onDelete,
    meta = {},
}) {
    const createEditHandler = (row) => () => onEdit && onEdit(row);
    const createDeleteHandler = (row) => () => onDelete && onDelete(row);

    return (
        <CardContent className="pt-0">
            <Table className="border-separate border-spacing-y-3">
                <TableHeader>
                    <TableRow className="bg-primary-hijauTua hover:bg-primary-hijauTua">
                        {columns.map((column, index) => (
                            <TableHead
                                key={column.accessorKey || column.id}
                                className={cn(
                                    "text-white font-bold",
                                    column.accessorKey === "no" && "text-center",
                                    index === 0 ? "rounded-l-lg" : "",
                                    index === columns.length - 1 ? "rounded-r-lg" : ""
                                )}
                            >
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((row, idx) => (
                            <TableRow
                                key={row.id || idx}
                                className={cn(
                                    "font-medium text-primary-hijauTua transition-colors duration-150 ease-in-out",
                                    "hover:bg-gray-100 hover:text-primary-hijauTua"
                                )}
                            >
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={column.accessorKey || column.id}
                                        className={cn(
                                            "py-4 font-medium",
                                            column.accessorKey === "no" && "text-center",
                                            index === 0 ? "rounded-l-lg" : "",
                                            index === columns.length - 1 ? "rounded-r-lg" : ""
                                        )}
                                    >
                                        {column.accessorKey === "no"
                                            ? startIndex + idx + 1
                                            : column.cell
                                                ? column.cell({
                                                    row,
                                                    onEdit: createEditHandler(row),
                                                    onDelete: createDeleteHandler(row),
                                                    ...meta,
                                                })
                                                : row[column.accessorKey]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center rounded-lg">
                                Tidak ada data yang cocok.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
    );
}

export function DataTablePagination({ currentPage, totalPages, goToPage }) {
    if (totalPages <= 1) return null;

    return (
        <CardFooter className="flex justify-between items-center p-6 pt-4">
            <p className="text-sm text-gray-500">
                Halaman {currentPage} dari {totalPages}
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}
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
    );
}