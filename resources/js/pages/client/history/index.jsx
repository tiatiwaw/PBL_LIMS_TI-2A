import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link } from "@inertiajs/react";
import {
  ChevronsLeft,
  FlaskConical,
  ClipboardCheck,
  RotateCw,
  PackageCheck,
  Clock,
  CalendarDays,
  CheckCircle2,
  Loader2,
  XCircle,
  CreditCard,
  CheckCircle,
  FileText,
  RefreshCw,
} from "lucide-react";
import { useHistory } from "@/hooks/useClient";
import Loading from "@/components/ui/loading";

export default function HistoryPage({ auth, orderId }) {
  const { data: history, isLoading, isError, errorMessage } =
    useHistory(orderId);

  // ============================================
  // PENGATURAN PROGRESS BAR BERDASARKAN STATUS
  // ============================================
  
  // Mapping status ke persentase progress (0-100)
  // Sesuaikan nilai persentase untuk setiap status
  const STATUS_PROGRESS_MAP = {
    'received': 3,           // Status: Sample diterima
    'disapproved': 100,       // Status: Ditolak (langsung ke akhir)
    'pending_payment': 18,    // Status: Menunggu pembayaran
    'paid': 30,               // Status: Sudah dibayar
    'in_progress': 43,        // Status: Sedang dikerjakan
    'received_test': 58,      // Status: Hasil tes diterima
    'revision_test': 72 ,      // Status: Revisi tes
    'pending': 85,            // Status: Menunggu
    'completed': 100,         // Status: Selesai
  };
  
  // Atur posisi horizontal garis (dalam pixel)
  // Nilai positif = geser ke kanan, negatif = geser ke kiri
  const LINE_OFFSET_LEFT = 20;  // <-- GESER KIRI/KANAN
  const LINE_OFFSET_RIGHT = 40; // <-- GESER KIRI/KANAN
  
  // ============================================

  const iconMap = {
    received: FlaskConical,
    disapproved: XCircle,
    pending_payment: CreditCard,
    paid: CheckCircle,
    in_progress: RotateCw,
    received_test: FileText,
    revision_test: RefreshCw,
    pending: Clock,
    completed: PackageCheck,
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Riwayat" header="Memuat Data...">
          <Loading/>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout title="Riwayat">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <XCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-lg font-semibold text-red-600">
            {errorMessage}
          </p>
          <Link
            href="/client"
            className="mt-6 bg-primary-hijauTua hover:bg-primary-hijauGelap text-white px-6 py-3 rounded-xl shadow-lg"
          >
            Kembali
          </Link>
        </div>
      </DashboardLayout>
    );
  }
  
  const statusNow = history?.data?.order?.status;
  const allStatuses = (history?.data?.statuses || []).filter(
    status => status?.name !== 'disapproved' || statusNow === 'disapproved'
  );

  // Ambil persentase progress berdasarkan status saat ini
  const progressPercent = STATUS_PROGRESS_MAP[statusNow] || 0;

  return (
    <DashboardLayout
      title={`Riwayat ${history?.data?.order?.order_number || ""}`}
      header="Status Pesanan Anda"
    >
      <div className="w-full flex flex-col px-8 pt-8 pb-6 bg-gradient-to-br from-primary-hijauTerang via-white to-primary-toska overflow-auto rounded-3xl shadow-xl border border-primary-hijauPudar min-h-[75vh]">
        <div className="flex-shrink-0 mb-8">
          <div className="inline-flex items-center gap-3 bg-primary-hijauTua text-white px-6 py-3 rounded-2xl shadow-md">
            <div className="w-2 h-2 rounded-full bg-primary-hijauMuda animate-pulse" />
            <span className="text-lg font-bold tracking-wide">
              Kode Order: {history?.data?.order?.order_number || "M-XX"}
            </span>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-start w-full">
          <div className="relative w-full py-8 overflow-x-auto">
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-40 min-w-max px-5">

              {allStatuses.length > 1 && (
                <div 
                  className="hidden lg:block absolute top-[52px] h-1.5 bg-primary-hijauPudar rounded-full"
                  style={{
                    left: `${LINE_OFFSET_LEFT}px`,
                    right: `${LINE_OFFSET_RIGHT}px`,
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-primary-hijauTua to-primary-hijauMuda rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              )}

              {allStatuses.map((item, index) => {
                const Icon = iconMap[item.name] || FlaskConical;

                return (
                  <div
                    key={index}
                    className="relative z-10 flex flex-row lg:flex-col items-center text-left lg:text-center gap-4 lg:gap-0 flex-shrink-0 group"
                  >
                    <div
                      className={`relative w-16 h-16 top-5 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300
                      ${
                        item.is_active
                          ? "bg-white border-4 border-primary-hijauTua text-primary-hijauTua shadow-lg scale-110"
                          : "bg-primary-hijauTua text-white border-4 border-primary-hijauMuda shadow-md"
                      }`}
                    >
                      <Icon size={28} strokeWidth={2.5} />

                      {item.is_active && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-hijauMuda rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2
                            size={14}
                            className="text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 lg:flex-none lg:mt-10">
                      <h3
                        className={`text-base font-bold mb-2 transition-colors ${
                          item.is_active
                            ? "text-primary-hijauTua"
                            : "text-primary-hijauGelap"
                        }`}
                      >
                        {item.label}
                      </h3>

                      <div className="flex justify-center items-center gap-2 text-sm text-primary-hijauTua/70">
                        <CalendarDays size={16} />
                        <span className="whitespace-nowrap font-medium">
                          {new Date(
                            history?.data?.order?.updated_at
                          ).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 mt-6 border-t-2 border-primary-hijauPudar">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md border border-primary-hijauPudar">
            <div className="w-10 h-10 rounded-xl bg-primary-hijauTua flex items-center justify-center">
              <Clock size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-primary-hijauTua/60 font-medium">
                Estimasi
              </span>
              <span className="text-xl font-bold text-primary-hijauTua">
                {history?.data?.order?.estimasi || "-"}
              </span>
            </div>
          </div>

          <Link
            href="/client"
            className="bg-primary-hijauTua hover:bg-primary-hijauGelap text-white font-semibold py-3 px-8 rounded-2xl flex items-center gap-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <ChevronsLeft size={20} />
            <span>Kembali</span>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}