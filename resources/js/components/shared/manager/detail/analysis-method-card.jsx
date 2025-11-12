import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Microscope } from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/formatters";

export default function AnalysisMethodCard({ methods, reportIssuedAt, reportFilePath, resultValue }) {
    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                        <Microscope className="w-5 h-5 text-white" />
                    </div>
                    Metode Analisis
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
                {methods.map((method, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-slate-200"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 mb-2">Nama Metode</p>
                                <p className="font-bold text-primary-hijauTua text-lg">
                                    {method.analyses_method}
                                </p>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-slate-200">
                            <p className="text-xs text-slate-500 mb-1">Harga</p>
                            <p className="font-bold text-primary-hijauTua text-xl">
                                {formatCurrency(method.price)}
                            </p>
                        </div>
                    </div>
                ))}

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4"></div>

                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-slate-500 mb-1">Laporan Terbit</p>
                        <p className="font-bold text-primary-hijauTua">
                            {formatDate(reportIssuedAt)}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 mb-1">Lokasi File</p>
                        <p className="font-semibold text-slate-600 text-sm">
                            {reportFilePath}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 mb-2">Hasil Nilai</p>
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                            <p className="text-sm text-green-800 font-medium">
                                {resultValue}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}