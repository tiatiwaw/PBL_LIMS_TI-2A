import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useMemo } from "react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { getOrdersColumns } from "@/components/shared/analyst/order-columns";
import { useOrders } from "@/hooks/analyst/useOrders";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";

const OrderPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: ordersData, isLoading, refetch } = useOrders();
  const orders = ordersData?.orders

  const filterData = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "in_progress", label: "In Progress" },
    { value: "pending", label: "Pending" },
    { value: "disapproved", label: "Disapproved" },
    { value: "approved", label: "Approved" },
    { value: "received", label: "Received" },
  ];

  const columns = useMemo(() => getOrdersColumns({ refetch }), [refetch]);

  if (isLoading) return <Loading />;

  return (
    <DashboardLayout
      title="Daftar Pesanan"
      user={user}
      header="Lihat Daftar Pesanan"
    >
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
