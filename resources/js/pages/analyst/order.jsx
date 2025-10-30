import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link } from "@inertiajs/react";
import { CircleAlert } from "lucide-react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";

const OrderPage = () => {
  const user = {
    name: "Nardo",
    role: "Analyst",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  // Dummy data order
  const data = Array.from({ length: 27 }, (_, i) => ({
    id: `ORDER-${i + 1}`,
    status: i % 2 === 0 ? "In Progress" : "Pending",
  }));

  // Definisi kolom tampilan
  const columns = [
    {
      header: "ID Order",
      accessorKey: "id",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Aksi",
      accessorKey: "id",
      cell: (row) => (
        <div className="bg-primary-hijauTua w-max p-1 rounded-full text-white hover:opacity-70">
          <Link href={`/analyst/order/details/`}>
            <CircleAlert size={18} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout title="Analyst" user={user} header="Selamat Datang Analyst!">
      <ManagedDataTable
        data={data}
        columns={columns}
        pageSize={5}          // ✅ pagination per 5
        showSearch={false}    // ❌ matikan search agar tidak ngefilter id "user"
        showFilter={false}    // ❌ matikan filter
        searchColumn="id"     // ✅ pastikan tidak error
        filterColumn="status" // ✅ masih aman
      />
    </DashboardLayout>
  );
};

export default OrderPage;
