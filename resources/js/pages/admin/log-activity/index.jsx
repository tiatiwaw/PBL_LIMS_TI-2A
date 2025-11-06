import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getActivitiesColumns } from "@/components/shared/admin/log-activity-columns";
import ActivityDetailSheet from "@/components/shared/sheet/activity-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { users } from "@/data/admin/users";
import { useMemo, useState } from "react";

const filterData = [
    { value: "all", label: "All Role" },
    { value: "Client", label: "Client" },
    { value: "Staff", label: "Staff" },
    { value: "Analis", label: "Analis" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Manager", label: "Manager" },
];

export default function AdminActivitiesPage({ auth, activityData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const handleShowDetail = (activity) => {
        setSelectedActivity(activity);
        setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = activityData || users;

    const columns = useMemo(() => getActivitiesColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout title="Users" user={currentUser} header="Aktivitas Log Website">
            <ManagedDataTable
                data={parameters}
                columns={columns}
                showFilter={true}
                showCreate={false}
                filterColumn="role"
                filterOptions={filterData}
            />
            <ActivityDetailSheet isOpen={isOpen} onOpenChange={setIsOpen} activity={selectedActivity} />
        </DashboardLayout>
    );
}