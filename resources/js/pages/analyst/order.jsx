import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useMemo } from "react";
import { usePage } from "@inertiajs/react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { getOrdersColumns } from "@/components/shared/analyst/order-columns";

const OrderPage = () => {
  const { orders } = usePage().props; // Ambil dari backend
  
  const { auth } = usePage().props;
  const user = auth.user;

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
    <DashboardLayout title="Daftar Pesanan" user={user} header="Lihat Daftar Pesanan">
      <ManagedDataTable
        data={orders ?? []}
        columns={columns}
        filterOptions={filterData}
        searchColumn="title"
        showFilter={true}
        showCreate={false}
        filterColumn="status"
      />
    </DashboardLayout>
  );
};

export default OrderPage;
