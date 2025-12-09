import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link } from "@inertiajs/react";
import { CircleAlert } from "lucide-react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { getOrdersColumns } from "@/components/shared/analyst/order-columns";
import { orders } from "@/data/analyst/orders";
import { useMemo } from "react";
import { filterStatusOrder } from "@/utils/statusUtils";

const OrderPage = () => {
  const user = {
    name: "Nardo",
    role: "Analyst",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const columns = useMemo(() => getOrdersColumns(), []);


  return (
    <DashboardLayout title="Analyst" user={user} header="Selamat Datang Analyst!">
      <ManagedDataTable
        data={orders}
        columns={columns}
        filterOptions={filterStatusOrder}
        searchColumn="title"
        showFilter={true}
        filterColumn="status"
      />
    </DashboardLayout>
  );
};

export default OrderPage;
