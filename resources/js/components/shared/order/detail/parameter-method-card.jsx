import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";
import {
    getParameterStatusVariant,
    getSampleStatusVariant,
    getStatusParameterLabel,
} from "@/utils/statusUtils";

const ParameterMethodCard = ({ data }) => {
    // Handle empty data
    if (!data) {
        return (
            <Card className="border border-slate-200 shadow-xl bg-white">
                <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                            <Gauge className="w-5 h-5 text-white" />
                        </div>
                        Parameter & Metode Uji
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 min-h-96 flex items-center justify-center">
                    <p className="text-slate-500 text-center">Tidak ada data</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                        <Gauge className="w-5 h-5 text-white" />
                    </div>
                    Parameter & Metode Uji
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div>
                    <h4 className="font-bold text-slate-900 mb-4 text-lg">
                        Parameter Uji
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-slate-500 mb-1">
                                Nama Parameter
                            </p>
                            <p className="font-bold text-slate-900">
                                {data.test_parameters.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 mb-1">
                                Kategori
                            </p>
                            <Badge variant="info" className="capitalize">
                                {data.test_parameters.category}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 mb-1">
                                Detection Limit
                            </p>
                            <p className="font-semibold text-slate-900">
                                {data.test_parameters.detection_limit}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 mb-1">
                                Satuan
                            </p>
                            <Badge variant="info">
                                {data.test_parameters.unit_values.value}
                            </Badge>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-slate-500 mb-1">
                                Standar Kualitas
                            </p>
                            <p className="font-semibold text-slate-900">
                                {data.test_parameters.quality_standard}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-4 text-lg">
                        Metode Uji
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <p className="text-sm text-slate-500 mb-1">
                                Nama Metode
                            </p>
                            <p className="font-bold text-slate-900">
                                {data.test_methods.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 mb-1">
                                Durasi
                            </p>
                            <Badge variant="info">
                                {data.test_methods.duration} menit
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 mb-1">
                                Masa Berlaku
                            </p>
                            <Badge variant="info">
                                {data.test_methods.validity_period}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 mb-1">
                                Parameter Terkait
                            </p>
                            <p className="font-semibold text-slate-900">
                                {data.test_methods.applicable_parameter}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 mb-1">
                                Referensi Standar
                            </p>
                            <p className="font-semibold text-slate-900">
                                {data.test_methods.reference_standards.name}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-slate-700 text-base">
                            Hasil Pengujian
                        </span>
                        <Badge variant={getParameterStatusVariant(data.status)}>
                            {getStatusParameterLabel(data.status)}
                        </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-slate-600 mb-1">
                                Nilai Hasil
                            </p>
                            <p className="font-bold text-slate-900 text-2xl">
                                {data.result}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 mb-1">
                                Satuan
                            </p>
                            <Badge
                                variant="info"
                                className="text-base px-3 py-1"
                            >
                                {data.test_parameters.unit_values.value}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ParameterMethodCard;
