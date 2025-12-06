// resources/js/pages/client/payment/index.jsx
import React, { useState, useMemo, useEffect } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { FileDown, XCircle } from "lucide-react";
import { getSampleColumns } from "@/components/shared/client/sample-columns";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { usePayment } from "@/hooks/useClient";
import PaymentSummary from '@/components/shared/client/payment-summary.jsx';
import AnalysisMethodList from "@/components/shared/client/analysis-method-list.jsx";
import MethodPayment from "@/components/shared/client/method-payment.jsx";
import axios from "axios";

export default function ClientPayment({ auth, orderId }) {
  const { data: order, isLoading, isError, errorMessage } = usePayment(orderId);

  // State Metode Pembayaran
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentChannels, setPaymentChannels] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    if (order?.data?.payment_channels) {
      setPaymentChannels(order.data.payment_channels);
      if (order.data.payment_channels.length > 0) {
        setSelectedPayment(order.data.payment_channels[0].code);
      }
    }
  }, [order]);

  // === Handle Create Transaction & Redirect ===
  const handlePayment = async () => {
  if (!selectedPayment) {
    alert("Silakan pilih metode pembayaran terlebih dahulu.");
    return;
  }

  setLoadingPayment(true);

  try {
    const res = await axios.post(
      `/api/v1/client/orders/transaction/${orderId}`,
      { method: selectedPayment }
    );

    if (res.data.success) {
      const reference = res.data.data.reference;

      // ✅ Redirect ke halaman detail transaksi (Bukan ke Tripay langsung)
      router.visit(`/client/orders/transaction/${reference}`);
    } else {
      alert(res.data.message || "Gagal membuat transaksi.");
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Gagal membuat transaksi");
  } finally {
    setLoadingPayment(false);
  }
};



  // === STATE LOADING ===
  if (isLoading) {
    return (
      <DashboardLayout title="Detail Pembayaran" header="Memuat Data...">
        <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  // === STATE ERROR ===
  if (isError) {
    return (
      <DashboardLayout title="Detail Pembayaran" header="Terjadi Kesalahan">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <XCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-lg font-semibold text-red-600">
            {errorMessage || "Gagal memuat data."}
          </p>
          <Link href={route("client.index")} className="mt-6 bg-primary-hijauTua hover:bg-primary-hijauGelap text-white px-6 py-3 rounded-xl shadow-lg">
            Kembali
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // === DATA BERHASIL DIMUAT ===
  return (
    <DashboardLayout title="Pembayaran Order" header="Pembayaran Order">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 text-primary-hijauTua p-4">

        {/* --- Detail Order --- */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-5 text-gray-800">Detail Order</h2>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-2 text-sm font-medium">
            <span className="text-gray-600">Nama Client</span>
            <span>: {auth?.user?.name || "-"}</span>

            <span className="text-gray-600">Kode Pemesanan</span>
            <span>: {order?.data?.order_details?.order_number || "-"}</span>

            <span className="text-gray-600">Judul</span>
            <span>: {order?.data?.order_details?.title || "-"}</span>

            <span className="text-gray-600">Status</span>
            <span className="capitalize">: {order?.data?.order_details?.status || "-"}</span>

            <span className="text-gray-600">Tipe Pemesanan</span>
            <span className="capitalize">: {order?.data?.order_details?.order_type || "-"}</span>

            <span className="text-gray-600">Tanggal Order</span>
            <span>: {order?.data?.order_details?.order_date || "-"}</span>

            <span className="text-gray-600">Estimasi Selesai</span>
            <span>: {order?.data?.order_details?.estimate_date || "-"}</span>
          </div>
        </div>

        {/* --- Analyses Method List --- */}
        <AnalysisMethodList methods={order?.data?.metode_analisis || []} />

        {/* --- Metode Pembayaran --- */}
        <MethodPayment
          selected={selectedPayment}
          setSelected={setSelectedPayment}
          channels={paymentChannels}
        />

        {/* --- Payment Summary --- */}
        <PaymentSummary summary={order?.data?.payment_summary} />

        {/* --- Tombol Lakukan Pembayaran --- */}
        <div className="text-right mt-1">
          <button
            onClick={handlePayment}
            disabled={loadingPayment}
            className={`bg-primary-hijauTua text-white px-6 py-2 rounded-xl hover:bg-primary-hijauGelap transition ${loadingPayment ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loadingPayment ? "Membuat Transaksi..." : "Lakukan Pembayaran"}
          </button>
        </div>

        {/* --- Tombol Kembali --- */}
        <div className="w-full flex justify-end mt-1">
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
