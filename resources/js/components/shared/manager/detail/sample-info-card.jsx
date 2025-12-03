import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Package,
    Check,
    Wrench,
    TestTube,
    Beaker,
    Thermometer,
} from "lucide-react";
import {
    getSampleStatusVariant,
    getStatusParameterLabel,
} from "@/utils/statusUtils";

export default function SampleInfoCard({ sample }) {
    if (!sample || typeof sample !== 'object') return null;

    return (
        <Card className="border border-slate-200 shadow-xl bg-white col-span-2 lg:col-span-1">
            <CardHeader className="bg-primary-hijauTua text-white rounded-t-2xl">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                        <TestTube className="w-5 h-5" />
                    </div>
                    Informasi Sample
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Package className="w-4 h-4" />
                            <span>Nama Sample</span>
                        </div>
                        <p className="font-bold text-primary-hijauTua text-lg">
                            {sample?.name || "N/A"}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <FileText className="w-4 h-4" />
                                <span>Kategori</span>
                            </div>
                            <Badge variant="success">
                                {sample?.sample_category?.name || "N/A"}
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <Beaker className="w-4 h-4" />
                                <span>Bentuk</span>
                            </div>
                            <p className="font-bold text-primary-hijauTua">
                                {sample?.form || "N/A"}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <Check className="w-4 h-4" />
                                <span>Kondisi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="font-bold text-primary-hijauTua">
                                    {sample?.condition || "N/A"}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <TestTube className="w-4 h-4" />
                                <span>Status</span>
                            </div>
                            <Badge variant={getSampleStatusVariant(sample?.status)}>
                                {getStatusParameterLabel(sample?.status) || "N/A"}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                        <Wrench className="w-4 h-4" />
                        <span>Metode Pengawetan</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-primary-hijauTua font-medium">
                            {sample?.preservation_method || "N/A"}
                        </p>
                    </div>
                </div>

                <div className="pt-2">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                        <Thermometer className="w-4 h-4" />
                        <span>Kondisi Penyimpanan</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-primary-hijauTua font-medium">
                            {sample?.storage_condition || "N/A"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}