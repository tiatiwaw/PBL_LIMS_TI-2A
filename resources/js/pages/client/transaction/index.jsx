// resources/js/pages/client/transaction/index.jsx
import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { XCircle } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useTransaction } from "@/hooks/useClient"; 
import Transaction from "@/components/shared/client/transaction.jsx";
import { Button } from "@/components/ui/button";

export default function ClientTransaction({ auth, reference }) {
  // Gunakan hook useTransaction untuk ambil data dari API
  const {
    data: transaction,
    isLoading,
    isError,
    errorMessage
  } = useTransaction(reference); // orderId sebagai parameter API

  // === STATE LOADING ===
  if (isLoading) {
    return (
      <DashboardLayout title="Detail Transaksi" header="Memuat Data...">
        <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  // === STATE ERROR ===
  if (isError) {
    return (
      <DashboardLayout title="Detail Transaksi" header="Terjadi Kesalahan">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <XCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-lg font-semibold text-red-600">
            {errorMessage || "Gagal memuat data transaksi."}
          </p>
          <Link
            href={route("client.index")}
            className="mt-6 bg-primary-hijauTua hover:bg-primary-hijauGelap text-white px-6 py-3 rounded-xl shadow-lg"
          >
            Kembali
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // === DATA BERHASIL DIMUAT ===
  return (
    <DashboardLayout title="Detail Transaksi" header="Detail Transaksi">
      <div className="w-full max-w-5xl mx-auto p-4">
        {/* Hanya menampilkan canvas Transaction */}
        <Transaction transactionData={transaction?.data} />

        {/* Tombol Kembali */}
        <div className="w-full mt-1 ">
          <Link href={route("client.index")}>
            <Button className="bg-primary-hijauTua text-white hover:bg-primary-hijauGelap"
             style={{ marginLeft: "892px" }}>
              Kembali
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
