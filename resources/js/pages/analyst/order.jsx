import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useMemo } from "react";
import { usePage } from "@inertiajs/react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { getOrdersColumns } from "@/components/shared/analyst/order-columns";

const OrderPage = () => {
  const { orders } = usePage().props; // Ambil dari backend
  const user = {
    name: "Nardo",
    role: "Analyst",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const filterData = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "in_progress", label: "In Progress" },
    { value: "pending", label: "Pending" },
    { value: "disapproved", label: "Disapproved" },
    { value: "approved", label: "Approved" },
    { value: "received", label: "Received" },
  ];

  const columns = useMemo(() => getOrdersColumns(), []);

  return (
    <DashboardLayout title="Analyst" user={user} header="Selamat Datang, Analyst!">
      <ManagedDataTable
        data={orders ?? []}
        columns={columns}
        filterOptions={filterData}
        searchColumn="title"
        showFilter={true}
        filterColumn="status"
      />
    </DashboardLayout>
  );
};

export default OrderPage;
