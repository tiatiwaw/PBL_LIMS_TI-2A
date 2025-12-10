import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useMemo } from "react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { getOrdersColumns } from "@/components/shared/analyst/order-columns";
import { useOrders } from "@/hooks/useAnalyst";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";

const OrderPage = () => {

  const { data: ordersData, isLoading, error } = useOrders();
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

  const columns = useMemo(() => getOrdersColumns());

   if (isLoading) {
          return (
              <DashboardLayout title="Daftar Pesanan" header="Lihat Daftar Pesanan">
                  <Loading />
              </DashboardLayout>
          );
      }
  
      if (error) {
          return (
             <DashboardLayout title="Daftar Pesanan" header="Lihat Daftar Pesanan">
                  <div className="text-center text-red-500 py-8">
                      {error.message || "Terjadi kesalahan saat memuat data"}
                  </div>
              </DashboardLayout>
          );
      }

  return (
    <DashboardLayout
      title="Daftar Pesanan"
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
