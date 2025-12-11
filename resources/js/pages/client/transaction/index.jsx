// resources/js/pages/client/transaction/index.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { XCircle, RefreshCw, CheckCircle, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useTransaction } from "@/hooks/useClient"; 
import Transaction from "@/components/shared/client/transaction.jsx";
import { Button } from "@/components/ui/button";

export default function ClientTransaction({ auth, reference }) {
  const [pollingCount, setPollingCount] = useState(0);
  const {
    data: transaction,
    isLoading,
    isError,
    errorMessage,
    refetch
  } = useTransaction(reference);

  // === AUTO-REFRESH LOGIC ===
  useEffect(() => {
    // Auto-refresh setiap 10 detik jika status UNPAID
    if (transaction?.data?.status === 'UNPAID') {
      const interval = setInterval(() => {
        setPollingCount(prev => prev + 1);
        refetch();
      }, 10000);

      // Stop polling setelah 60 kali (10 menit)
      if (pollingCount >= 60) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [transaction, refetch, pollingCount]);

  // === LOADING STATE ===
  if (isLoading) {
    return (
      <DashboardLayout title="Detail Transaksi" header="Memuat Data...">
        <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  // === ERROR STATE ===
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

  const status = transaction?.data?.status;
  const isPaid = status === 'PAID';
  const isUnpaid = status === 'UNPAID';

  return (
    <DashboardLayout title="Detail Transaksi" header="Detail Transaksi">
      <div className="w-full max-w-5xl mx-auto p-4">
        
        {/* STATUS BANNER */}
        {isPaid && transaction?.data?.redirect_url ? (
          <div className="mb-8">
            {/* HEADER SUCCESS */}
            <div className="flex flex-col items-center justify-center mb-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Pembayaran Berhasil!
              </h3>
            </div>

            {/* TOMBOL OPSI 4 - MINIMALIS & ELEGANT */}
            <div className="max-w-md mx-auto">
              <button
                onClick={() => {
                  window.location.href = transaction.data.redirect_url;
                }}
                className="elegant-success-btn w-full group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Lihat Detail Receipt</span>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-all group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>
        ) : isUnpaid ? (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-yellow-600 animate-spin" />
              <span className="text-yellow-700 font-medium">
                Menunggu pembayaran...
              </span>
            </div>
            <p className="text-yellow-600 text-xs mt-2 text-center">
              Status: {status} • Auto-refresh setiap 10 detik
            </p>
          </div>
        ) : null}

        {/* TRANSACTION COMPONENT */}
        <Transaction transactionData={transaction?.data} />

        {/* TOMBOL AKSI */}
        <div className="flex justify-end mt-6">
          <Link href={route("client.index")}>
            <Button className="bg-primary-hijauTua text-white hover:bg-primary-hijauGelap">
              Kembali ke Dashboard
            </Button>
          </Link>
        </div>

        {/* CSS STYLES untuk Opsi 4 */}
        <style jsx>{`
          .elegant-success-btn {
            background-color: transparent;
            color: #059669;
            padding: 14px 24px;
            border-radius: 8px;
            border: 1.5px solid #059669;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.25s ease;
            letter-spacing: 0.3px;
            position: relative;
            overflow: hidden;
          }

          .elegant-success-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, 
              rgba(5, 150, 105, 0.05) 0%, 
              rgba(5, 150, 105, 0.1) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }

          .elegant-success-btn:hover::before {
            opacity: 1;
          }

          .elegant-success-btn:hover {
            background-color: #059669;
            color: white;
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15);
            border-color: #047857;
            transform: translateY(-1px);
          }

          .elegant-success-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(5, 150, 105, 0.1);
          }

          /* Animasi garis bawah saat hover */
          .elegant-success-btn::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background-color: #047857;
            transition: width 0.3s ease;
          }

          .elegant-success-btn:hover::after {
            width: calc(100% - 48px);
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
}