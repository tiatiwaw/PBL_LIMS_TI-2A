import DashboardLayout from "@/components/layouts/dashboard-layout";
import AnalystDetailSheet from "@/components/shared/sheet/analyst-detail-sheet";
import { getAnalystColumns } from "@/components/shared/supervisor/analyst-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { analysts } from "@/data/supervisor/analyst";
import { useMemo, useState } from "react";

export default function AnalystsPage({ Auth, dataAnalyst }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAnalyst, setSelectedAnalyst] = useState(null);
    const currentUser = Auth?.user || {
        name: "Indro",
        role: "Supervisor",
    };

    const handleShowDetail = (analyst) => {
        setSelectedAnalyst(analyst);
        setIsOpen(true);
    };

    const parameter = dataAnalyst || analysts;

    const columns = useMemo(
        () => getAnalystColumns({ onShowDetail: handleShowDetail }),
        []
    );

    return (
        <DashboardLayout
            title="Analis"
            header="Manajemen Analis"
            user={currentUser}
        >
            <ManagedDataTable
                data={parameter}
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
