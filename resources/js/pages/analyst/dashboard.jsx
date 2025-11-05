import DashboardLayout from "@/components/layouts/dashboard-layout";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { getOrdersColumns } from "@/components/shared/analyst/incoming-order-columns";
import { useMemo } from "react";
import StatCard from "@/components/shared/card/stat-card";
import { usePage, router } from '@inertiajs/react';

 
const dashboard = () => {
  const { orders, stats } = usePage().props;
  const [selectedTest, setSelectedTest] = useState(null);

  const user = {
    name: "Puff",
    role: "analyst",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

const handleConfirm = () => {
  if (!selectedTest) return;

  console.log("Kirim ke:", route("analyst.orders.accept", selectedTest.id));

  router.put(route("analyst.orders.accept", { order: selectedTest.id }), {}, {
    onSuccess: () => {
      console.log("Berhasil diterima!");
      setSelectedTest(null);
    },
    onError: (err) => {
      console.error("Gagal:", err);
    },
  });
};



  const handleCancel = () => {
    setSelectedTest(null);
  };

  const columns = useMemo(() => getOrdersColumns({setSelectedTest: setSelectedTest}), []);

  return (
    <DashboardLayout title="Dashboard" user={user} header="Selamat Datang, Analis">
      <div className="flex flex-col gap-10 text-[#02364B]">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats &&
            Object.entries(stats).map(([key, value]) => (
              <StatCard key={key} stat={{ title: key, value }} />
            ))}
        </div>

        <h2 className="font-bold text-lg mt-3 -mb-3">Tes Mendatang</h2>
        <ManagedDataTable
          data={orders ?? []}
          columns={columns}
          pageSize={5}
          showSearch={false}
          showFilter={false}
          searchColumn="id"
          filterColumn="tipe"
        />


        {selectedTest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="border-0 w-[450px] bg-primary-hijauMuda relative rounded-2xl shadow-xl text-[#02364B]">
              <button
                onClick={handleCancel}
                className="absolute top-4 right-4 text-primary-hijauTua hover:opacity-80"
              >
                ✕
              </button>

              <CardHeader className="flex items-center justify-center pt-10">
                <AlertTriangle className="w-20 h-20 text-primary-hijauTua" />
              </CardHeader>

              <CardContent className="text-center px-8 pb-8">
                <p className="font-bold text-lg leading-relaxed">
                  Apakah Anda yakin akan menerima pesanan?
                </p>
              </CardContent>

              <CardFooter className="flex justify-center gap-4 pb-8">
                <Button
                  onClick={handleConfirm}
                  className="rounded-lg px-6 bg-primary-hijauTua text-white hover:bg-primary-hijauTua/90"
                >
                  Terima
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="rounded-lg px-6 border-primary-hijauTua text-primary-hijauTua hover:bg-primary-hijauTua hover:text-white"
                >
                  Batal
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default dashboard;
