import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getReagenColumns } from "@/components/shared/supervisor/parameter-columns";
import { getEquipmentColumns } from "@/components/shared/supervisor/parameter-columns";
import { useMemo } from "react";

export default function ParameterDetailPage({ auth }) {
    const currentUser = auth?.user || {
        name: "Supervisor",
        role: "Supervisor",
    };

    // Mock Data
    const selectedParameter = {
        name: "Total Viable Count (TVC)",
        kategori: "Mikrobiologi",
        unit_value: "CFU/mL",
        reference: "ISO 4833-1:2013",
    };

    const selectedMetode = {
        name: "Pengukuran pH Elektrometri",
        applicable_parameter: "pH",
        reference: "SNI 06-6989.11:2004",
    };

    const reagenList = [
        {
            id: "R001",
            nama: "Methanol",
            formula: "CH3OH",
            supplier: "PT Kimia Makmur",
            grade: "AR",
            storage_location: "Storage A-01",
        },
        {
            id: "R002",
            nama: "Ethanol",
            formula: "C2H5OH",
            supplier: "Lab Nusantara",
            grade: "Technical",
            storage_location: "Storage B-03",
        },
        {
            id: "R003",
            nama: "Acetone",
            formula: "C3H6O",
            supplier: "PT Solventindo",
            grade: "AR",
            storage_location: "Storage A-02",
        },
        {
            id: "R004",
            nama: "Chloroform",
            formula: "CHCl3",
            supplier: "Prima Chemical",
            grade: "HPLC",
            storage_location: "Storage C-01",
        },
        {
            id: "R005",
            nama: "Hydrogen Peroxide",
            formula: "H2O2",
            supplier: "PT Oksida Jaya",
            grade: "AR",
            storage_location: "Storage B-01",
        },
    ];

    const equipmentList = [
        {
            id: "E001",
            nama: "Pipette",
            brand_type: "Eppendorf",
            serial_number: "SN-1001",
            status: "good",
            location: "Lab Room 1 - Shelf A",
        },
        {
            id: "E002",
            nama: "Beaker Glass",
            brand_type: "Pyrex",
            serial_number: "SN-1002",
            status: "damaged",
            location: "Lab Room 2 - Rack B",
        },
        {
            id: "E003",
            nama: "Erlenmeyer Flask",
            brand_type: "Iwaki",
            serial_number: "SN-1003",
            status: "expired",
            location: "Lab Room 1 - Shelf C",
        },
        {
            id: "E004",
            nama: "Bunsen Burner",
            brand_type: "Fisher Scientific",
            serial_number: "SN-1004",
            status: "good",
            location: "Workshop Room - Drawer 2",
        },
        {
            id: "E005",
            nama: "Analytical Balance",
            brand_type: "Mettler Toledo",
            serial_number: "SN-1005",
            status: "damaged",
            location: "Lab Room 3 - Bench A",
        },
    ];

    // Columns
    const reagenColumns = useMemo(() => getReagenColumns(), []);
    const equipmentColumns = useMemo(() => getEquipmentColumns(), []);

    return (
        <DashboardLayout
            title="Detail Parameter"
            header="Detail Parameter"
            user={currentUser}
        >
            {/* Container halaman */}
            <div className="relative space-y-10 pb-24">
                {/* PARAMETER UJI */}
                <div className="grid grid-cols gap-6">
                    {/* DETAIL PARAMETER */}
                    <div>
                        <label className="text-lg font-extrabold text-[#003B4A] mb-2 block">
                            Detail Parameter Uji
                        </label>

                        <Card className="border border-gray-300 rounded-xl shadow bg-white">
                            <CardContent className="p-5 space-y-3 text-sm text-[#003B4A]">
                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Nama parameter
                                    </span>
                                    <span>:</span>
                                    <span>{selectedParameter.name}</span>
                                </div>

                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">Kategori</span>
                                    <span>:</span>
                                    <span>{selectedParameter.kategori}</span>
                                </div>

                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">Unit</span>
                                    <span>:</span>
                                    <span>
                                        {selectedParameter.unit_value || "N/A"}
                                    </span>
                                </div>

                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Standar Mutu
                                    </span>
                                    <span>:</span>
                                    <span>{selectedParameter.reference}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* METODE UJI */}
                <div className="grid grid-cols gap-6 mt-10">
                    {/* DETAIL METODE */}
                    <div>
                        <label className="text-lg font-extrabold text-[#003B4A] mb-2 block">
                            Detail Metode Uji
                        </label>

                        <Card className="border border-gray-300 rounded-xl shadow bg-white">
                            <CardContent className="p-5 space-y-3 text-sm text-[#003B4A]">
                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Nama Metode
                                    </span>
                                    <span>:</span>
                                    <span>{selectedMetode.name}</span>
                                </div>

                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Cakupan parameter
                                    </span>
                                    <span>:</span>
                                    <span>
                                        {selectedMetode.applicable_parameter}
                                    </span>
                                </div>

                                <div className="grid grid-cols-[140px_10px_1fr]">
                                    <span className="font-bold">
                                        Standar mutu
                                    </span>
                                    <span>:</span>
                                    <span>{selectedMetode.reference}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* TABLE REAGEN (REPLACED) */}
                <div>
                    <h2 className="text-lg font-extrabold text-[#003B4A] mb-2">
                        Reagen
                    </h2>

                    <ManagedDataTable
                        data={reagenList}
                        columns={reagenColumns}
                        showSearch={false}
                        showFilter={false}
                        showCreate={false}
                    />
                </div>

                {/* TABLE EQUIPMENT (REPLACED) */}
                <div className="mt-10">
                    <h2 className="text-lg font-extrabold text-[#003B4A] mb-2">
                        Equipment
                    </h2>

                    <ManagedDataTable
                        data={equipmentList}
                        columns={equipmentColumns}
                        showSearch={false}
                        showFilter={false}
                        showCreate={false}
                    />
                </div>

                {/* BUTTON BACK */}
                <div className="absolute bottom-6 right-6">
                    <Link href="/supervisor/parameters">
                        <Button className="bg-gray-200 hover:bg-gray-300 text-black px-8 rounded-lg">
                            Back
                        </Button>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
