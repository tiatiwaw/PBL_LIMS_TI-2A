import React, { useState, useMemo } from 'react';
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Link } from '@inertiajs/react';
import { ChevronsLeft } from 'lucide-react';
import { samples } from "@/data/client/samples";
import { getSampleColumns } from "@/components/shared/client/sample-columns";
import SampleDetailsDialog from "@/components/shared/dialog/sample-detail-dialog";
import { Button } from '@/components/ui/button';

const details = () => {

    const user = {
        name: 'Nardo',
        role: 'Client',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    // --- Data Detail Pemesanan ---
    const orderDetails = [
        { label: 'ID Pemesanan', value: 'M - 10' },
        { label: 'ID klien', value: '1234' },
        { label: 'Metode Analisis', value: 'Basah' },
        { label: 'Judul', value: 'Gas Metabolisme Tubuh' },
        { label: 'Nilai Hasil', value: '98' },
        { label: 'Tanggal Order', value: '10/10/2000' },
        { label: 'Tanggal Estimasi', value: '23/10/2000' },
        { label: 'Waktu Laporan', value: '10/10/2000 11:14:45' },
        { label: 'Catatan', value: 'Cukup baik' },
        { label: 'Tipe Pemesanan', value: 'Urgent' },
    ];

    const filterData = [
        { value: "all", label: "All Status" },
        { value: "Done", label: "Done" },
        { value: "In Progress", label: "In Progress" },
    ]

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedSample, setSelectedSample] = useState(null);

    const handleShowDetail = (sample) => {
        setSelectedSample(sample);
        setIsDialogOpen(true);
    };

    const columns = useMemo(() => getSampleColumns({  onShowDetail: handleShowDetail}), []);

    return (
        <DashboardLayout title="Client" user={user} header='Selamat Datang Client!'>
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 text-primary-hijauTua p-4">

                {/* --- Bagian 1: Detail Pemesanan --- */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-xl font-bold mb-5 text-gray-800">Detail Pemesanan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-y-2 text-sm font-medium">
                        {orderDetails.map((item, index) => (
                            <React.Fragment key={index}>
                                <span className="text-gray-600">{item.label}</span>
                                <span className="ml-2">: {item.value}</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <ManagedDataTable
                    data={samples}
                    columns={columns}
                    searchColumn="name"
                    showFilter={true}
                    filterColumn="status"
                    filterOptions={filterData}
                />

                <SampleDetailsDialog
                    sample={selectedSample}
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />

                {/* --- Tombol Kembali --- */}
                <div className="w-full flex justify-end mt-4">
                    <Button className="bg-primary-hijauTua">
                        <Link
                            href="/client/dashboard"
                            >
                            Kembali
                        </Link>
                    </Button>
                </div>
            </div>

        </DashboardLayout>
    )
}

export default details;
