import Loading from "@/components/ui/loading";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getMethodsColumns } from "@/components/shared/admin/test-columns";
import MethodDetailSheet from "@/components/shared/sheet/method-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { editMethodFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import { useMethods, useReferences } from "@/hooks/useManager";

export default function ManagerMethodsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);

    const { data: methods, isLoading, error } = useMethods();
    const {
        data: references,
        isLoading: referenceLoading,
        error: referenceError,
    } = useReferences();

    const handleShowDetail = (tests) => {
        setSelectedMethod(tests);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getMethodsColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading || referenceLoading) {
        return (
            <DashboardLayout title="Dashboard Manager" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Manager" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Metode Uji"
            header="Manajemen Metode Uji"
        >
            <ManagedDataTable
                data={methods}
                columns={columns}
                editFields={editMethodFields(references)}
                createTitle="Tambah Metode Uji"
                editTitle="Edit Metode Uji"
                deleteTitle="Hapus Metode Uji"
                showCreate={false}
            />
            <MethodDetailSheet
                data={selectedMethod}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
