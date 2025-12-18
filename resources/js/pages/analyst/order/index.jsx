import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useMemo } from "react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { getOrdersColumns } from "@/components/shared/analyst/order-columns";
import { useOrders } from "@/hooks/useAnalyst";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { filterStatusOrder } from "@/utils/statusUtils";

const OrderPage = () => {

  const { data: ordersData, isLoading, error } = useOrders();
  const orders = ordersData?.orders

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
        filterOptions={filterStatusOrder}
        searchColumn="title"
        showFilter={true}
        showCreate={false}
        filterColumn="status"
      />
    </DashboardLayout>
  );
};

export default OrderPage;
