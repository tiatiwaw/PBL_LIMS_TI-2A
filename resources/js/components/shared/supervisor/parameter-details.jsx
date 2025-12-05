import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getReagenColumns } from "@/components/shared/supervisor/parameter-columns";
import { getEquipmentColumns } from "@/components/shared/supervisor/parameter-columns";
import { useMemo } from "react";
import {
    getConditionTypeLabel,
    getConditionTypeVariant,
    getDetectionTypeVariant,
} from "@/utils/statusUtils";
import { Eye, FlaskRound, Beaker } from "lucide-react";

export default function ParameterDetails({
    sampleId,
    n_parameter_methods,
    test_parameters,
    test_methods,
    samples,
    onBack,
}) {
    // Find current sample and its parameter method
    const currentSample = samples?.find((s) => s.id === sampleId);
    const currentNParameterMethod = n_parameter_methods?.find(
        (npm) => npm.sample_id === sampleId
    );

    // Get parameter and method details
    const selectedParameter = test_parameters?.find(
        (p) => p.id === currentNParameterMethod?.test_parameter_id
    );
    const selectedMetode = test_methods?.find(
        (m) => m.id === currentNParameterMethod?.test_method_id
    );

    // Get reagents and equipments for this parameter
    const reagenList = currentNParameterMethod?.reagents || [];
    const equipmentList = currentNParameterMethod?.equipments || [];

    // Columns
    const reagenColumns = useMemo(() => getReagenColumns, []);
    const equipmentColumns = useMemo(() => getEquipmentColumns, []);

    return (
        <div className="flex flex-col min-h-screen space-y-10 px-4 py-2">
            {/* HEADER YANG MENARIK */}
            <div className="border-l-4 border-teal-600 rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-teal-600 p-3 rounded-lg shadow-md">
                        <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-teal-900">
                            Detail Parameter Sampel
                        </h1>
                        <p className="text-sm text-teal-700 mt-1">
                            Lihat informasi lengkap parameter, metode, reagen,
                            dan peralatan
                        </p>
                    </div>
                </div>

                {/* Sample Badge */}
                <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm font-semibold text-teal-900">
                        Sampel:
                    </span>
                    <Badge className="bg-teal-600 hover:bg-teal-700 text-white">
                        {currentSample?.name || "N/A"}
                    </Badge>
                </div>
            </div>

            {/* SAMPLE INFO */}
            <div className="flex-1 gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <FlaskRound className="w-5 h-5 text-blue-600" />
                        </div>
                        <label className="text-lg font-extrabold text-[#003B4A]">
                            Informasi Sampel
                        </label>
                    </div>

                    <Card className="border border-gray-300 rounded-xl shadow bg-white">
                        <CardContent className="p-5 space-y-3 text-sm text-[#003B4A]">
                            <div className="grid grid-cols-[140px_10px_1fr]">
                                <span className="font-bold">Nama Sample</span>
                                <span>:</span>
                                <span>{currentSample?.name || "-"}</span>
                            </div>

                            <div className="grid grid-cols-[140px_10px_1fr]">
                                <span className="font-bold">Kategori</span>
                                <span>:</span>
                                <span>
                                    {currentSample?.sample_categories?.name ||
                                        "-"}
                                </span>
                            </div>
                            <div className="grid grid-cols-[140px_10px_1fr]">
                                <span className="font-bold">Bentuk</span>
                                <span>:</span>
                                <span>{currentSample?.form || "-"}</span>
                            </div>
                            <div className="grid grid-cols-[140px_10px_1fr]">
                                <span className="font-bold">Kondisi</span>
                                <span>:</span>
                                <span>
                                    {(
                                        <Badge
                                            variant={getConditionTypeVariant(
                                                currentSample?.condition
                                            )}
                                        >
                                            {getConditionTypeLabel(
                                                currentSample?.condition
                                            )}
                                        </Badge>
                                    ) || "-"}
                                </span>
                            </div>
                            <div className="grid grid-cols-[140px_10px_1fr]">
                                <span className="font-bold">
                                    Metode Pengawetan
                                </span>
                                <span>:</span>
                                <span>
                                    {currentSample?.preservation_method || "-"}
                                </span>
                            </div>
                            <div className="grid grid-cols-[140px_10px_1fr]">
                                <span className="font-bold">
                                    Kondisi Penyimpanan
                                </span>
                                <span>:</span>
                                <span>
                                    {currentSample?.storage_condition || "-"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {selectedParameter && (
                <div className="flex-1 gap-6">
                    {/* DETAIL PARAMETER */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <Beaker className="w-5 h-5 text-purple-600" />
                            </div>
                            <label className="text-lg font-extrabold text-[#003B4A]">
                                Detail Parameter Uji
                            </label>
                        </div>

                        <Card className="border border-gray-300 rounded-xl shadow bg-white">
                            <CardContent className="p-5 space-y-3 text-sm text-[#003B4A]">
                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Nama Parameter
                                    </span>
                                    <span>:</span>
                                    <span>
                                        {selectedParameter?.name || "-"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">Kategori</span>
                                    <span>:</span>
                                    <span>
                                        {selectedParameter?.category || "-"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Satuan Unit
                                    </span>
                                    <span>:</span>
                                    <span>
                                        {selectedParameter?.unit_values
                                            ?.value || "-"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Detection Limit
                                    </span>
                                    <span>:</span>
                                    <span>
                                        {(
                                            <Badge
                                                variant={
                                                    getDetectionTypeVariant(
                                                        selectedParameter?.detection_limit
                                                    ) || "outline"
                                                }
                                                className="capitalize"
                                            >
                                                {
                                                    selectedParameter?.detection_limit
                                                }
                                            </Badge>
                                        ) || "-"}
                                    </span>
                                </div>{" "}
                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Standar Kualitas
                                    </span>
                                    <span>:</span>
                                    <span>
                                        {selectedParameter?.quality_standard ||
                                            "-"}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {selectedMetode && (
                <div className="flex-1 gap-6 mt-10">
                    {/* DETAIL METODE */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-amber-100 p-2 rounded-lg">
                                <FlaskRound className="w-5 h-5 text-amber-600" />
                            </div>
                            <label className="text-lg font-extrabold text-[#003B4A]">
                                Detail Metode Uji
                            </label>
                        </div>

                        <Card className="border border-gray-300 rounded-xl shadow bg-white">
                            <CardContent className="p-5 space-y-3 text-sm text-[#003B4A]">
                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Nama Metode
                                    </span>
                                    <span>:</span>
                                    <span>{selectedMetode?.name || "-"}</span>
                                </div>

                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Parameter Berlaku
                                    </span>
                                    <span>:</span>
                                    <span>
                                        {selectedMetode?.applicable_parameter ||
                                            "-"}
                                    </span>
                                </div>

                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">Durasi</span>
                                    <span>:</span>
                                    <span>
                                        {selectedMetode?.duration || "-"}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* TABLE REAGEN */}
            {reagenList.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <Beaker className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-lg font-extrabold text-[#003B4A]">
                            Reagen
                        </h2>
                    </div>

                    <ManagedDataTable
                        data={reagenList}
                        columns={reagenColumns}
                        showSearch={false}
                        showFilter={false}
                        showCreate={false}
                    />
                </div>
            )}

            {/* TABLE EQUIPMENT */}
            {equipmentList.length > 0 && (
                <div className="mt-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <Beaker className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h2 className="text-lg font-extrabold text-[#003B4A]">
                            Peralatan
                        </h2>
                    </div>

                    <ManagedDataTable
                        data={equipmentList}
                        columns={equipmentColumns}
                        showSearch={false}
                        showFilter={false}
                        showCreate={false}
                    />
                </div>
            )}

            {/* BUTTON BACK */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <Button
                    onClick={onBack}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-8 rounded-lg"
                >
                    Kembali
                </Button>
            </div>
        </div>
    );
}
