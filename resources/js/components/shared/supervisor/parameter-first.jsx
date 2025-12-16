import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, FlaskConical } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import {
    getMetodeColumns,
    getParameterColumns,
} from "@/components/shared/supervisor/parameter-columns";
import { toast } from "sonner";

export default function ParameterFirst({
    sampleId,
    parameterList,
    metodeList,
    formData,
    onParameterSelect,
    onNext,
    onBack,
}) {
    const filterDataParameter = [
        { value: "all", label: "All Kategori" },
        { value: "Kimia", label: "Kimia" },
        { value: "Klinik", label: "Klinik" },
        { value: "Mikrobiologi", label: "Mikrobiologi" },
        { value: "Fisika", label: "Fisika" },
    ];

    const [modalType, setModalType] = useState(null);
    const [selectedParameter, setSelectedParameter] = useState(null);
    const [selectedMetode, setSelectedMetode] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Initialize dari formData jika ada
    useEffect(() => {
        if (formData?.samples && Array.isArray(formData.samples)) {
            const sampleData = formData.samples.find(
                (s) => s.sample_id === sampleId
            );
            if (sampleData) {
                if (sampleData.parameter_id) {
                    const param = parameterList?.find(
                        (p) => p.id === sampleData.parameter_id
                    );
                    setSelectedParameter(param);
                }
                if (sampleData.method_id) {
                    const method = metodeList?.find(
                        (m) => m.id === sampleData.method_id
                    );
                    setSelectedMetode(method);
                }
            }
        }
    }, [sampleId, formData, parameterList, metodeList]);

    const handleSelectParameter = (parameter) => {
        setSelectedParameter(parameter);
        setModalType(null);
        setDialogOpen(false);
    };

    const handleSelectMetode = (metode) => {
        setSelectedMetode(metode);
        setModalType(null);
        setDialogOpen(false);
    };

    const handleNext = () => {
        // Save to formData sebelum lanjut
        if (selectedParameter && selectedMetode) {
            onParameterSelect(
                sampleId,
                selectedParameter.id,
                selectedMetode.id
            );
            onNext();
        } else {
            toast.warning("Pilih Parameter dan Metode terlebih dahulu!");
        }
    };

    return (
        <div>
            {/* FORM SECTION */}
            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-[#003B4A]">
                        Pilih Parameter & Metode Uji
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Tambahkan parameter dan metode uji yang diperlukan untuk
                        parameter ini
                    </p>
                </div>
                {/* PARAMETER */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-lg font-extrabold text-[#003B4A] flex items-center mb-2">
                            <span className="min-w-[150px]">Parameter Uji</span>
                            <span>:</span>
                        </label>

                        {/* BUTTON */}
                        <Card
                            className="border border-gray-300 rounded-xl shadow cursor-pointer hover:shadow-md transition"
                            onClick={() => {
                                setDialogOpen(true);
                                setModalType("parameter");
                            }}
                        >
                            <CardContent
                                className={`p-5 flex ${
                                    selectedParameter
                                        ? "justify-start"
                                        : "justify-center"
                                }`}
                            >
                                <p
                                    className={`font-urbanist font-semibold text-base ${
                                        selectedParameter
                                            ? "text-[#003B4A]"
                                            : "text-gray-400 italic"
                                    }`}
                                >
                                    {selectedParameter
                                        ? selectedParameter.name
                                        : "Pilih Parameter"}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* DETAIL PARAMETER */}
                    <div>
                        <label className="text-lg font-extrabold text-[#003B4A] mb-2 block">
                            Detail Parameter Uji
                        </label>

                        {selectedParameter ? (
                            <Card className="border border-gray-300 rounded-xl shadow p-0">
                                <CardContent className="p-4 space-y-3">
                                    <div className="grid grid-cols-[130px_10px_1fr] text-sm text-[#003B4A]">
                                        <span className="font-bold">
                                            Nama parameter
                                        </span>
                                        <span>:</span>
                                        <span>{selectedParameter.name}</span>
                                    </div>

                                    <div className="grid grid-cols-[130px_10px_1fr] text-sm text-[#003B4A]">
                                        <span className="font-bold">
                                            Kategori
                                        </span>
                                        <span>:</span>
                                        <span>
                                            {selectedParameter.category}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-[130px_10px_1fr] text-sm text-[#003B4A]">
                                        <span className="font-bold">Unit</span>
                                        <span>:</span>
                                        <span>
                                            {
                                                selectedParameter.unit_values
                                                    .value
                                            }
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-[130px_10px_1fr] text-sm text-[#003B4A]">
                                        <span className="font-bold">
                                            Standar mutu
                                        </span>
                                        <span>:</span>
                                        <span>
                                            {
                                                selectedParameter
                                                    .reference_standards.name
                                            }
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="border border-gray-300 bg-gray-50 rounded-xl shadow-lg">
                                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                                        <BarChart3 className="w-7 h-7 text-teal-600" />
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium">
                                        Belum ada Parameter
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* METODE */}
                <div className="grid grid-cols-2 gap-6 mt-10">
                    <div>
                        <label className="text-lg font-extrabold text-[#003B4A] flex items-center mb-2">
                            <span className="min-w-[150px]">Metode Uji</span>
                            <span>:</span>
                        </label>

                        {/* BUTTON */}
                        <Card
                            className="border border-gray-300 rounded-xl shadow cursor-pointer hover:shadow-md transition"
                            onClick={() => {
                                setDialogOpen(true);
                                setModalType("metode");
                            }}
                        >
                            <CardContent
                                className={`p-5 flex ${
                                    selectedMetode
                                        ? "justify-start"
                                        : "justify-center"
                                }`}
                            >
                                <p
                                    className={`font-urbanist font-semibold text-base ${
                                        selectedMetode
                                            ? "text-[#003B4A]"
                                            : "text-gray-400 italic"
                                    }`}
                                >
                                    {selectedMetode
                                        ? selectedMetode.name
                                        : "Pilih Metode"}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* DETAIL METODE */}
                    <div>
                        <label className="text-lg font-extrabold text-[#003B4A] mb-2 block">
                            Detail Metode uji
                        </label>

                        {selectedMetode ? (
                            <Card className="border border-gray-300 rounded-xl shadow p-0">
                                <CardContent className="p-4 space-y-3 text-sm text-[#003B4A]">
                                    <div className="grid grid-cols-[130px_10px_1fr]">
                                        <span className="font-bold">
                                            Nama Metode
                                        </span>
                                        <span>:</span>
                                        <span>{selectedMetode.name}</span>
                                    </div>

                                    <div className="grid grid-cols-[130px_10px_1fr]">
                                        <span className="font-bold">
                                            Cakupan Parameter
                                        </span>
                                        <span>:</span>
                                        <span>
                                            {
                                                selectedMetode.applicable_parameter
                                            }
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-[130px_10px_1fr]">
                                        <span className="font-bold">
                                            Standar mutu
                                        </span>
                                        <span>:</span>
                                        <span>
                                            {
                                                selectedMetode
                                                    .reference_standards.name
                                            }
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="border border-gray-300 bg-gray-50 rounded-xl shadow-lg">
                                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <FlaskConical className="w-7 h-7 text-blue-600" />
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium">
                                        Belum ada Metode
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>
                            {modalType === "parameter"
                                ? "Pilih Parameter"
                                : modalType === "metode"
                                ? "Pilih Metode"
                                : "Pilih"}
                        </DialogTitle>
                        <DialogDescription>
                            Cari dan pilih{" "}
                            {modalType === "parameter" ? "Parameter" : "Metode"}{" "}
                            yang akan dipilih.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-grow overflow-y-auto">
                        <ManagedDataTable
                            data={
                                modalType === "parameter"
                                    ? parameterList
                                    : metodeList
                            }
                            columns={
                                modalType === "parameter"
                                    ? getParameterColumns({
                                          onSelectParameter:
                                              handleSelectParameter,
                                      })
                                    : getMetodeColumns({
                                          onSelectMetode: handleSelectMetode,
                                      })
                            }
                            showFilter={modalType === "parameter"}
                            filterColumn="kategori"
                            filterOptions={
                                modalType === "parameter"
                                    ? filterDataParameter
                                    : []
                            }
                            showSearch={true}
                            showCreate={false}
                            pageSize={5}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                            className="bg-gray-200 hover:bg-gray-300"
                        >
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* BUTTONS BACK + LANJUT */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <Button
                    onClick={onBack}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 px-8 py-3"
                >
                    Kembali
                </Button>
                <Button
                    onClick={handleNext}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200 px-8 py-3"
                >
                    Lanjut
                </Button>
            </div>
        </div>
    );
}
