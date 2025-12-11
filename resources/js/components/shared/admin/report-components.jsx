import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/utils/constant/report";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { formatCompactNumber, formatCurrency } from "@/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, FileText, Search } from "lucide-react";
import { getOrderTypeVariant } from "@/utils/statusUtils";

export const KPICard = ({ icon: Icon, title, value, subtitle, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white border border-[#2CACAD]/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
        <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-[#2CACAD]/10 rounded-xl">
                <Icon className="w-6 h-6 text-[#024D60]" />
            </div>
        </div>
        <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-[#02364B] mb-1 tracking-tight">
            {value}
        </p>
        {subtitle && (
            <p className="text-xs text-slate-400 max-w-80 md:max-w-40 lg:max-w-full truncate">
                {subtitle}
            </p>
        )}
    </motion.div>
);

export const CustomTooltip = ({ active, payload, label, formatValue }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-white p-4 border border-slate-100 shadow-xl rounded-xl text-xs z-50 min-w-[150px]">
            <p className="font-bold text-[#024D60] mb-2 border-b pb-1 border-slate-100">
                {label}
            </p>
            {payload.map((entry, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center gap-4 mb-1 last:mb-0"
                >
                    <span className="text-slate-500 flex items-center gap-1">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: entry.fill || entry.color,
                            }}
                        />
                        {entry.name}
                    </span>
                    <span className="font-bold text-[#02364B]">
                        {formatValue ? formatValue(entry.value) : entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

const RADIAN = Math.PI / 180;

export const renderPieLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    if (percent === 0) return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs font-bold drop-shadow-md"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const EmptyState = ({
    icon: Icon = Search,
    title = "Data Tidak Ditemukan",
    description = "Coba sesuaikan filter atau kata kunci pencarian Anda.",
    onReset,
}) => (
    <div className="flex flex-col items-center justify-center h-[400px] bg-slate-50/50 rounded-xl border border-dashed border-slate-200 text-slate-400">
        <Icon className="w-12 h-12 mb-4 opacity-20" />
        <h3 className="text-lg font-semibold text-slate-600">{title}</h3>
        <p className="text-sm">{description}</p>
        {onReset && (
            <Button
                variant="outline"
                className="mt-4 text-[#024D60]"
                onClick={onReset}
            >
                Reset Filter
            </Button>
        )}
    </div>
);

const EmptyChartState = () => (
    <div className="flex flex-col items-center justify-center h-full bg-slate-50/50 rounded-xl border border-dashed border-slate-200 text-slate-400">
        <h3 className="text-lg font-semibold text-slate-600">
            Data tidak ditemukan
        </h3>
        <p className="text-sm">Tidak ada data</p>
    </div>
);

export const ChartCard = ({ title, children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        className={className}
    >
        <div className="h-full border-slate-200 shadow-sm bg-white rounded-lg">
            <div className="p-6 pb-0">
                <h3 className="text-lg font-semibold text-[#02364B]">
                    {title}
                </h3>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </motion.div>
);

export const SimpleBarChart = ({
    title,
    data,
    dataKey,
    categoryKey = "name",
    color = COLORS.primary.muda,
    barSize = 32,
    delay = 0,
    height = 300,
    className,
}) => (
    <ChartCard title={title} delay={delay} className={className}>
        {!data || data.length === 0 ? (
            <div style={{ height }}>
                <EmptyChartState />
            </div>
        ) : (
            <ResponsiveContainer width="100%" height={height}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                    />
                    <XAxis
                        dataKey={categoryKey}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 11 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "#F8FAFC" }}
                    />
                    <Bar
                        dataKey={dataKey}
                        fill={color}
                        radius={[4, 4, 0, 0]}
                        barSize={barSize}
                    />
                </BarChart>
            </ResponsiveContainer>
        )}
    </ChartCard>
);

export const RankingBarChart = ({
    title,
    data,
    dataKey,
    categoryKey = "name",
    height = 300,
    delay = 0,
    className,
    colorMain = "#024D60",
    colorTop = "#2CACAD",
}) => (
    <ChartCard title={title} delay={delay} className={className}>
        {!data || data.length === 0 ? (
            <div style={{ height }}>
                <EmptyChartState />
            </div>
        ) : (
            <ResponsiveContainer width="100%" height={height}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                        stroke="#f1f5f9"
                    />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey={categoryKey}
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        width={120}
                        tick={{ fill: "#64748b", fontSize: 11 }}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "#F8FAFC" }}
                    />
                    <Bar
                        dataKey={dataKey}
                        fill={colorMain}
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index === 0 ? colorTop : colorMain}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        )}
    </ChartCard>
);

export const DistributionPieChart = ({
    title,
    data,
    dataKey = "value",
    innerRadius = 60,
    outerRadius = 80,
    height = 300,
    delay = 0,
    className,
    showLegend = true,
}) => (
    <ChartCard title={title} delay={delay} className={className}>
        {!data || data.length === 0 ? (
            <div style={{ height }}>
                <EmptyChartState />
            </div>
        ) : (
            <ResponsiveContainer width="100%" height={height}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        paddingAngle={5}
                        dataKey={dataKey}
                        labelLine={false}
                        label={renderPieLabel}
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    entry.color ||
                                    COLORS.chartPalette[
                                        index % COLORS.chartPalette.length
                                    ]
                                }
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    {showLegend && (
                        <Legend
                            verticalAlign="bottom"
                            iconType="circle"
                            wrapperStyle={{ fontSize: "11px" }}
                        />
                    )}
                </PieChart>
            </ResponsiveContainer>
        )}
    </ChartCard>
);

export const TrendLineChart = ({
    title,
    data,
    dataKey,
    categoryKey = "name",
    lineColor = "#2CACAD",
    dotColor = "#024D60",
    height = 300,
    delay = 0,
    className,
}) => (
    <ChartCard title={title} delay={delay} className={className}>
        {!data || data.length === 0 ? (
            <div style={{ height }}>
                <EmptyChartState />
            </div>
        ) : (
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data} margin={{ left: 10, right: 10 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                    />
                    <XAxis
                        dataKey={categoryKey}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        name="Total"
                        dataKey={dataKey}
                        stroke={lineColor}
                        strokeWidth={3}
                        dot={{ fill: dotColor, r: 5 }}
                        activeDot={{ r: 8, fill: lineColor }}
                    />
                </LineChart>
            </ResponsiveContainer>
        )}
    </ChartCard>
);

export const TrendAreaChart = ({
    title,
    data,
    dataKey,
    categoryKey = "name",
    color = "#2CACAD",
    height = 300,
    delay = 0,
    className,
    tooltipFormatter,
}) => (
    <ChartCard title={title} delay={delay} className={className}>
        {!data || data.length === 0 ? (
            <div style={{ height }}>
                <EmptyChartState />
            </div>
        ) : (
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id={`color-${dataKey}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor={color}
                                stopOpacity={0.2}
                            />
                            <stop
                                offset="95%"
                                stopColor={color}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                    />
                    <XAxis
                        dataKey={categoryKey}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        tickFormatter={(val) => formatCompactNumber(val)}
                    />
                    <Tooltip
                        content={
                            <CustomTooltip formatValue={tooltipFormatter} />
                        }
                        cursor={{
                            stroke: color,
                            strokeWidth: 1,
                            strokeDasharray: "5 5",
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill={`url(#color-${dataKey})`}
                        activeDot={{ r: 6, strokeWidth: 0, fill: "#024D60" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        )}
    </ChartCard>
);

export const SummaryTable = ({
    title,
    badgeText,
    columns,
    data,
    emptyMessage,
}) => {
    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-[#02364B]">
                    {title}
                </CardTitle>
                <Badge
                    variant="secondary"
                    className="bg-[#E0F2F1] text-[#024D60]"
                >
                    {badgeText}
                </Badge>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#024D60] hover:bg-[#024D60]">
                            {columns.map((col, i) => (
                                <TableHead
                                    key={i}
                                    className={`font-medium text-white ${
                                        col.align === "right"
                                            ? "text-right"
                                            : ""
                                    }`}
                                >
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <TableRow
                                    key={index}
                                    className={
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50/50 hover:bg-[#2CACAD]/5"
                                    }
                                >
                                    <TableCell className="font-semibold text-[#02364B]">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-[#024D60]">
                                        {item.value}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center text-gray-400 py-4"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export const TransactionTable = ({ data, page, setPage, pageSize = 10 }) => {
    const totalPages = Math.ceil(data.length / pageSize);

    const currentData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [page, data, pageSize]);

    return (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-[#024D60] text-white py-4">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#2CACAD]" />
                    <CardTitle className="text-lg text-white">
                        Top 10 Rincian Transaksi
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {!data || data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[200px] bg-slate-50/50 rounded-xl border border-dashed border-slate-200 text-slate-400 m-6">
                        <h3 className="text-lg font-semibold text-slate-600">
                            Data tidak ditemukan
                        </h3>
                        <p className="text-sm">Tidak ada transaksi</p>
                    </div>
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 hover:bg-slate-50">
                                    <TableHead className="font-medium w-[150px]">
                                        No. Order
                                    </TableHead>
                                    <TableHead className="font-medium">
                                        Klien
                                    </TableHead>
                                    <TableHead className="font-medium">
                                        Tipe Order
                                    </TableHead>
                                    <TableHead className="font-medium">
                                        Tanggal
                                    </TableHead>
                                    <TableHead className="font-medium text-center">
                                        Jml Metode
                                    </TableHead>
                                    <TableHead className="font-medium text-right pr-6">
                                        Total Pendapatan
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentData.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        className="hover:bg-[#2CACAD]/5 transition-colors group"
                                    >
                                        <TableCell className="font-semibold text-[#02364B] group-hover:text-[#2CACAD] transition-colors">
                                            {row.order_number}
                                        </TableCell>
                                        <TableCell className="text-slate-600">
                                            {row.client_name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={getOrderTypeVariant(
                                                    row.order_type
                                                )}
                                                className="capitalize"
                                            >
                                                {row.order_type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-500 text-sm">
                                            {row.order_date}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                                                {row.method_count}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right pr-6 font-bold text-[#02364B]">
                                            {formatCurrency(row.revenue)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {data.length > pageSize && (
                            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => p - 1)}
                                    className="text-slate-500 hover:text-[#024D60] hover:bg-slate-50 gap-2 disabled:opacity-40"
                                >
                                    <ChevronLeft size={14} /> Sebelumnya
                                </Button>
                                <span className="text-sm text-slate-500 select-none">
                                    Halaman {page} / {totalPages}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="text-slate-500 hover:text-[#024D60] hover:bg-slate-50 gap-2 disabled:opacity-40"
                                >
                                    Berikutnya <ChevronRight size={14} />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};
