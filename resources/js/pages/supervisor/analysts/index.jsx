import DashboardLayout from "@/components/layouts/dashboard-layout";
import AnalystDetailSheet from "@/components/shared/sheet/analyst-detail-sheet";
import { getAnalystColumns } from "@/components/shared/supervisor/analyst-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useAnalysts } from "@/hooks/useSupervisor";
import { useMemo, useState } from "react";

export default function AnalystsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAnalyst, setSelectedAnalyst] = useState(null);
    const { data: dataAnalyst, isLoading, error } = useAnalysts();

    const handleShowDetail = (analyst) => {
        setSelectedAnalyst(analyst);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getAnalystColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Orders" header="Orders">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Orders" header="Orders">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Analis" header="Manajemen Analis">
            <ManagedDataTable
                data={dataAnalyst || []}
                columns={columns}
                showSearch={true}
                showFilter={false}
                showCreate={false}
            />
            <AnalystDetailSheet
                data={selectedAnalyst}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
