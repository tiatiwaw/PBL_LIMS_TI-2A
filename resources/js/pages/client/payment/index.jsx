// resources/js/pages/client/detail/index.jsx
import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { FileDown, XCircle } from "lucide-react";
import { getSampleColumns } from "@/components/shared/client/sample-columns";
import SampleDetailsDialog from "@/components/shared/dialog/sample-detail-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { useOrderDetail } from "@/hooks/useClient";
import PaymentSummary from '@/components/shared/client/payment-summary.jsx';
import AnalysisMethodList from "@/components/shared/client/analysis-method-list";
import { methods } from "@/data/client/methods";


export default function ClientOrderDetail({ auth, orderId }) {
  console.log("props dari Inertia:", { auth, orderId });

  const {
    data: order,
    isLoading,
    isError,
    errorMessage,
  } = useOrderDetail(orderId);

  // 🔸 State dialog sample
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);

  const handleShowDetail = (sample) => {
    setSelectedSample(sample);
    setIsDialogOpen(true);
  };

  const columns = useMemo(
    () => getSampleColumns({ onShowDetail: handleShowDetail }),
    []
  );

  // === STATE LOADING ===
  if (isLoading) {
    return (
      <DashboardLayout
        title="Detail Pembayaran"
        header="Memuat Data..."
      >
        <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  // === STATE ERROR ===
  if (isError) {
    return (
      <DashboardLayout
        title="Detail Pembayaran"
        header="Terjadi Kesalahan"
      >
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <XCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-lg font-semibold text-red-600">
            {errorMessage || "Gagal memuat data."}
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
    <DashboardLayout
      title="Pembayaran Order"
      header="Pembayaran Order"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 text-primary-hijauTua p-4">

        {/* --- Detail Pemesanan --- */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-5 text-gray-800">
            Detail Order
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-2 text-sm font-medium">
            <span className="text-gray-600">Nama Client</span>
            <span>: {auth?.user?.name || "-"}</span>

            <span className="text-gray-600">Kode Pemesanan</span>
            <span>: {order?.data?.order_details?.id_pemesanan || "-"}</span>

            <span className="text-gray-600">Judul</span>
            <span>: {order?.data?.order_details?.judul || "-"}</span>

            <span className="text-gray-600">Status</span>
            <span className="capitalize">: {order?.data?.order_details?.status || "-"}</span>

            <span className="text-gray-600">Tipe Pemesanan</span>
            <span className="capitalize">: {order?.data?.order_details?.tipe_pemesanan || "-"}</span>
            

            <span className="text-gray-600">Tanggal Order</span>
            <span>: {order?.data?.order_details?.tanggal_order || "-"}</span>

            <span className="text-gray-600">Estimasi Selesai</span>
            <span>: {order?.data?.order_details?.tanggal_estimasi || "-"}</span>

            
          </div>
        </div>

        


        {/*---Analyses Method List*/}
        <AnalysisMethodList/>

        {/*----Payment Summary */}
          <PaymentSummary
            methods={methods}
            diskon={0}
            admin={1000}
        />


        {/* --- Tombol Kembali --- */}
        <div className="w-full flex justify-end mt-4">
          <Link href={route("client.index")}>
            <Button className="bg-primary-hijauTua text-white hover:bg-primary-hijauGelap">
              Kembali
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
