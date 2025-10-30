import DashboardLayout from "@/components/layouts/dashboard-layout";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table"; // 💚 PAKAI INI

const dashboard = () => {
  const [selectedTest, setSelectedTest] = useState(null);

  const user = {
    name: "Puff",
    role: "Analis",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  // ✅ Data dummy tes mendatang
  const data = [
    { id: "M - 19", date: "01 / 10 / 2025", type: "Urgent" },
    { id: "M - 20", date: "05 / 10 / 2025", type: "Reguler" },
    { id: "M - 21", date: "10 / 10 / 2025", type: "Internal" },
    { id: "M - 22", date: "15 / 10 / 2025", type: "Reguler" },
    { id: "M - 23", date: "20 / 10 / 2025", type: "Urgent" },
    { id: "M - 24", date: "25 / 10 / 2025", type: "Internal" },
  ];

  // ✅ Kolom untuk ManagedDataTable (sama formatnya kayak OrderPage)
  const columns = [
    { header: "Kode Pesanan", accessorKey: "id" },
    { header: "Deadline Pengujian", accessorKey: "date" },
    { header: "Tipe Pesanan", accessorKey: "type" },
    {
      header: "Aksi",
      accessorKey: "id",
      cell: (row) => (
        <Button
          onClick={() => setSelectedTest(row)}
          variant="outline"
          className="border-primary-hijauTua hover:bg-primary-hijauTua hover:text-white"
        >
          Terima
        </Button>
      ),
    },
  ];

  const handleConfirm = () => {
    console.log("Pesanan dikonfirmasi:", selectedTest);
    setSelectedTest(null);
  };

  const handleCancel = () => {
    setSelectedTest(null);
  };

  return (
    <DashboardLayout title="Dashboard" user={user} header="Selamat Datang, Analis">
      <div className="flex flex-col gap-10 text-[#02364B]">

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { value: 40, label: "Total Pesanan" },
            { value: 6, label: "Pengujian Diterima" },
            { value: 25, label: "Pengujian Selesai" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl py-6 font-bold"
            >
              <p className="text-4xl">{stat.value}</p>
              <p className="text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ✅ Tabel pakai ManagedDataTable */}
        <h2 className="font-bold text-lg mt-3 -mb-3">Tes Mendatang</h2>
        <ManagedDataTable
          data={data}
          columns={columns}
          pageSize={5}
          showSearch={false}
          showFilter={false}
          searchColumn="id"
          filterColumn="type"
        />

        {/* Popup Konfirmasi */}
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
