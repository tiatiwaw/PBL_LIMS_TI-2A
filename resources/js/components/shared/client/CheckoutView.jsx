import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { FlaskConical } from "lucide-react";

export default function CheckoutView({
  onBack,
  qrImage,
  countdown,
  detail,
  orderInfo,   // 🔥 terima orderInfo dari props
}) {
  return (
    <DashboardLayout title="Checkout Pembayaran" header="Checkout Pembayaran">
      <div className="w-full max-w-5xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">

          {/* ==================== KOLOM KIRI ==================== */}
          <div className="flex flex-col items-center w-full md:w-auto">

            {/* CARD STATUS */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {orderInfo.status === "Pending_payment" ? "Belum Bayar" : orderInfo.status}
              </h2>
              <p className="text-sm text-gray-500">Selesaikan pembayaran sebelum waktu habis</p>

              <div className="flex justify-center gap-6 mt-4 text-3xl font-bold text-primary-hijauTua">
                <div className="text-center">
                  <p>{countdown.hours}</p>
                  <span className="text-xs text-gray-600">Jam</span>
                </div>
                <div className="text-center">
                  <p>{countdown.minutes}</p>
                  <span className="text-xs text-gray-600">Menit</span>
                </div>
                <div className="text-center">
                  <p>{countdown.seconds}</p>
                  <span className="text-xs text-gray-600">Detik</span>
                </div>
              </div>
            </div>

            {/* CARD QR CODE */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-100 mt-4 flex flex-col items-center">
              <img src={qrImage} alt="QR Code" className="w-60 h-60 object-contain" />
            </div>

            <Button className="mt-4 bg-primary-hijauTua text-white hover:bg-primary-hijauGelap w-full max-w-md">
              Unduh Kode QR
            </Button>
          </div>

          {/* ==================== KOLOM KANAN ==================== */}
          <div className="flex-1 flex flex-col bg-white rounded-xl shadow-lg p-6 border border-gray-100">

            {/* ========== INFORMASI PESANAN ========== */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6 p-5 rounded-xl border border-gray-300 bg-gray-100">
              <div>
                <p className="text-sm text-gray-500">Tanggal Pembelian</p>
                <p className="text-base font-semibold text-gray-800">{orderInfo.tanggal}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nomor Pesanan</p>
                <p className="text-base font-semibold text-gray-800">{orderInfo.nomor_pesanan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Metode Pembayaran</p>
                <p className="text-base font-semibold text-gray-800">{orderInfo.metode_pembayaran}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status Pesanan</p>
                <p className="text-base font-semibold text-red-500">
                  {orderInfo.status === "Pending_payment" ? "Belum Bayar" : orderInfo.status}
                </p>
              </div>
            </div>

            {/* ========== LABOO + ICON ========== */}
            <div className="w-full flex items-center justify-start gap-3 py-4 mb-6 border-y border-gray-200">
              <FlaskConical className="w-6 h-6 text-primary-hijauTua" />
              <h1 className="text-xl font-bold tracking-wide text-gray-800">LABOO</h1>
            </div>

            {/* ================= DETAIL PEMBAYARAN ================= */}
            <div className="mt-1">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Detail Pembayaran</h3>

              <div className="grid grid-cols-2 gap-y-2 text-sm font-medium">
                <span className="text-gray-600">Judul</span>
                <span className="text-right text-primary-hijauTua">{detail.judul}</span>

                <span className="text-gray-600">Nama</span>
                <span className="text-right text-primary-hijauTua">{detail.nama_client}</span>

                <span className="text-gray-600">Tipe Pemesanan</span>
                <span className="text-right text-primary-hijauTua">{detail.tipe_pemesanan}</span>

                <span className="text-gray-600">Harga</span>
                <span className="text-right text-primary-hijauTua">{detail.harga}</span>

                <span className="text-gray-600">PPN</span>
                <span className="text-right text-primary-hijauTua">{detail.ppn}</span>

                <span className="text-gray-600">Biaya Admin</span>
                <span className="text-right text-primary-hijauTua">{detail.admin}</span>
              </div>

              <div className="w-full bg-green-100 px-4 py-3 rounded-lg flex justify-between text-lg font-bold border border-green-200 mt-8">
                <span className="text-gray-800">Total Pembayaran</span>
                <span className="text-primary-hijauTua">{detail.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOMBOL KEMBALI */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={onBack}
            className="bg-primary-hijauTua text-white hover:bg-primary-hijauGelap"
          >
            Kembali
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
