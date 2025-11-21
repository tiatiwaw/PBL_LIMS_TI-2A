import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useState } from "react";
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

export default function FirstParameterPage({ auth }) {
    const currentUser = auth?.user || {
        name: "Supervisor",
        role: "Supervisor",
    };

    // MOCK DATA
    const parameterList = [
        {
            id: 1,
            name: "pH",
            kategori: "Kimia",
            unit_value: "pH",
            reference: "SNI 06-6989.11:2004",
        },
        {
            id: 2,
            name: "Viscosity",
            kategori: "Fisika",
            unit_value: "cP",
            reference: "ASTM D445",
        },
        {
            id: 3,
            name: "Konduktivitas",
            kategori: "Kimia",
            unit_value: "µS/cm",
            reference: "SNI 6989.1:2019",
        },
        {
            id: 4,
            name: "Suhu",
            kategori: "Fisika",
            unit_value: "°C",
            reference: "SNI 06-6989.23:2005",
        },
        {
            id: 5,
            name: "Turbiditas",
            kategori: "Fisika",
            unit_value: "NTU",
            reference: "ISO 7027",
        },
        {
            id: 6,
            name: "Total Viable Count (TVC)",
            kategori: "Mikrobiologi",
            unit_value: "CFU/mL",
            reference: "ISO 4833-1:2013",
        },
        {
            id: 7,
            name: "Kadar Air",
            kategori: "Kimia",
            unit_value: "%",
            reference: "AOAC 925.10",
        },
        {
            id: 8,
            name: "Kromium (Cr)",
            kategori: "Klinik",
            unit_value: "µg/L",
            reference: "< 5 µg/L",
        },
        {
            id: 9,
            name: "Nitrat (NO3-)",
            kategori: "Kimia",
            unit_value: "mg/L",
            reference: "SNI 6989.79:2011",
        },
        {
            id: 10,
            name: "Densitas",
            kategori: "Fisika",
            unit_value: "g/cm³",
            reference: "ASTM D4052",
        },
    ];

    const metodeList = [
        {
            id: 1,
            name: "Pengukuran pH Elektrometri",
            applicable_parameter: "pH",
            reference: "SNI 06-6989.11:2004",
        },
        {
            id: 2,
            name: "ASTM D445 - Kinematic Viscosity",
            applicable_parameter: "Viscosity",
            reference: "ASTM D445",
        },
        {
            id: 3,
            name: "Konduktivitas - Konduktometri",
            applicable_parameter: "Konduktivitas",
            reference: "SNI 6989.1:2019",
        },
        {
            id: 4,
            name: "Pengukuran Suhu Termometri",
            applicable_parameter: "Suhu",
            reference: "SNI 06-6989.23:2005",
        },
        {
            id: 5,
            name: "Turbiditas - Nephelometri",
            applicable_parameter: "Turbiditas",
            reference: "ISO 7027",
        },
        {
            id: 6,
            name: "Total Plate Count (TPC)",
            applicable_parameter: "Total Viable Count",
            reference: "ISO 4833-1:2013",
        },
        {
            id: 7,
            name: "Moisture Content - Oven Drying",
            applicable_parameter: "Kadar Air",
            reference: "AOAC 925.10",
        },
        {
            id: 8,
            name: "Analisis Logam Cr - ICP-MS",
            applicable_parameter: "Kromium (Cr)",
            reference: "USEPA 6020B",
        },
        {
            id: 9,
            name: "Analisis Nitrat - Spektrofotometri",
            applicable_parameter: "Nitrat (NO3-)",
            reference: "SNI 6989.79:2011",
        },
        {
            id: 10,
            name: "Density Meter",
            applicable_parameter: "Densitas",
            reference: "ASTM D4052",
        },
    ];

    const filterDataParameter = [
        { value: "all", label: "All Kategori" },
        { value: "Kimia", label: "Kimia" },
        { value: "Klinik", label: "Klinik" },
        { value: "Mikrobiologi", label: "Mikrobiologi" },
        { value: "Fisika", label: "Fisika" },
    ];

    //const filterDataMetode = [
    // { value: "all", label: "All Kategori" },
    // { value: "Kimia", label: "Kimia" },
    // { value: "Logam Berat", label: "Logam Berat" },
    // { value: "Mikrobiologi", label: "Mikrobiologi" },
    // { value: "Fisika", label: "Fisika" },
    // ];

    const [modalType, setModalType] = useState(null);
    const [selectedParameter, setSelectedParameter] = useState(null);
    const [selectedMetode, setSelectedMetode] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSelectParameter = (parameter) => {
        // setData((prev) => ({
        //     ...prev,
        //     selectedKlien: client,
        //     nomorOrder: orderNumber,
        // }));
        console.log(parameter);
        setSelectedParameter(parameter);
        setModalType(null);
        setDialogOpen(false); // Tutup dialog
    };

    const handleSelectMetode = (metode) => {
        // setData((prev) => ({
        //     ...prev,
        //     selectedKlien: client,
        //     nomorOrder: orderNumber,
        // }));
        console.log(metode);
        setSelectedMetode(metode);
        setModalType(null);
        setDialogOpen(false); // Tutup dialog
    };

    return (
        <DashboardLayout
            title="Parameter"
            header="Parameter"
            user={currentUser}
        >
            <div>
                {/* FORM SECTION */}
                <div className="space-y-6 mt-auto">
                    {/* PARAMETER */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-lg font-extrabold text-[#003B4A] flex items-center mb-2">
                                <span className="min-w-[150px]">
                                    Parameter Uji
                                </span>
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
                                        <div className="grid grid-cols-[120px_10px_1fr] text-sm text-[#003B4A]">
                                            <span className="font-bold">
                                                Nama parameter
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {selectedParameter.name}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-[120px_10px_1fr] text-sm text-[#003B4A]">
                                            <span className="font-bold">
                                                Kategori
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {selectedParameter.kategori}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-[120px_10px_1fr] text-sm text-[#003B4A]">
                                            <span className="font-bold">
                                                Unit
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {selectedParameter.unit_value}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-[120px_10px_1fr] text-sm text-[#003B4A]">
                                            <span className="font-bold">
                                                Standar mutu
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {selectedParameter.reference}
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
                                <span className="min-w-[150px]">
                                    Metode Uji
                                </span>{" "}
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
                                        <div className="grid grid-cols-[120px_10px_1fr]">
                                            <span className="font-bold">
                                                Nama Metode
                                            </span>
                                            <span>:</span>
                                            <span>{selectedMetode.name}</span>
                                        </div>

                                        <div className="grid grid-cols-[120px_10px_1fr]">
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

                                        <div className="grid grid-cols-[120px_10px_1fr]">
                                            <span className="font-bold">
                                                Standar mutu
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {selectedMetode.reference}
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

                <Dialog open={dialogOpen} onOpenChange={handleSelectParameter}>
                    <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle>
                                {modalType === "parameter"
                                    ? "Pilih Parameter"
                                    : modalType === "metode"
                                    ? "Pilih Metode"
                                    : "Pilih Klien"}
                            </DialogTitle>
                            <DialogDescription>
                                Cari dan{" "}
                                {modalType === "parameter"
                                    ? "Pilih Parameter"
                                    : modalType === "metode"
                                    ? "Pilih Metode"
                                    : "Pilih Klien"}{" "}
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
                                              onSelectMetode:
                                                  handleSelectMetode,
                                          })
                                }
                                showFilter={modalType === "parameter"}
                                filterColumn="kategori"
                                filterOptions={
                                    modalType === "parameter"
                                        ? filterDataParameter
                                        : [] //filterDataMetode
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
            </div>

            {/* BUTTONS BACK + LANJUT */}
            <div className="absolute bottom-6 right-6 flex gap-4">
                <Button className="bg-gray-200 hover:bg-gray-300 text-black px-8">
                    Back
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-white px-8">
                    Lanjut
                </Button>
            </div>
        </DashboardLayout>
    );
}
