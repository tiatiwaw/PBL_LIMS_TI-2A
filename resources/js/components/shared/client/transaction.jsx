import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FlaskConical, X } from "lucide-react";

export default function Transaction({ transactionData }) {
  if (!transactionData) return null;

  const item = transactionData.order_items?.[0];
  const [open, setOpen] = useState(false); // STATE POPUP
  const logoPath = `/logo_payment/${transactionData.payment_method}.jpeg`;

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6 ">

        <div className="flex flex-col items-center w-full md:w-auto">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border text-center flex flex-col h-full justify-between">

          {/* Bagian atas card: status & kode bayar */}
          <div>
            <h2 className="text-2xl font-bold">
              {transactionData.status === "UNPAID" ? "Belum Bayar" : transactionData.status}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Selesaikan pembayaran sebelum waktu habis
            </p>

            {transactionData.payment_method?.toUpperCase().includes("QRIS") ? (
              <div className="flex items-center justify-center mt-4">
                <img
                  src={transactionData.data?.qr_url || transactionData.qr_url}
                  alt="QR Code Pembayaran"
                  className="h-48 w-48 object-contain"
                />
              </div>
            ) : (
              <div className="mt-4 font-bold text-primary-hijauTua">
                VA / Kode Bayar:
                <div className="text-xl mt-2">{transactionData.pay_code}</div>
              </div>
            )}
          </div>

          {/* Bagian tengah card: logo */}
          {!transactionData.payment_method?.toUpperCase().includes("QRIS") && (
            <div className="flex items-center justify-center my-4">
              <img
                src={`/logo_payment/${transactionData.payment_method}.jpeg`}
                alt={transactionData.payment_name}
                className="h-12 object-contain"
                onError={(e) => (e.currentTarget.src = "/logopayment/default.jpeg")}
              />
            </div>
          )}

          {/* Bagian bawah card: tombol */}
          <div className="mt-4">
            <Button
              onClick={() => setOpen(true)}
              className="w-full bg-primary-hijauTua hover:bg-primary-hijauGelap text-white"
            >
              Lihat Instruksi Pembayaran
            </Button>
          </div>

        </div>
      </div>

        {/* ================= KANAN ================= */}
        <div className="flex-[1] bg-white rounded-xl shadow-lg p-6 border">

          
          {/* ===== CARD RINGKASAN ===== */}
          <div className="mb-6 p-5 rounded-xl bg-gray-100 grid grid-cols-3 text-center">
            {/* Metode */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-gray-500 text-xs">Metode</span>
              <span className="font-bold mt-1 text-sm md:text-base text-primary-hijauTua">
                {transactionData.payment_name}
              </span>
            </div>

            {/* Status */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-gray-500 text-xs">Status</span>
              <span className="font-bold mt-1 text-sm md:text-base text-primary-hijauTua">
                {transactionData.status}
              </span>
            </div>

            {/* Batas Waktu */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-gray-500 text-xs">Batas Waktu</span>
              <span className="font-bold mt-1 text-sm md:text-base text-primary-hijauTua">
                {transactionData.expired_time
                  ? new Date(transactionData.expired_time * 1000).toLocaleString("id-ID", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </span>
            </div>
          </div>




          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-6 h-6 text-primary-hijauTua" />
            <h1 className="text-xl font-bold">LABOO</h1>
          </div>

          <span className="text-m font-semibold text-primary-hijauTua">Detail Pembayaran</span>

          <div className="grid grid-cols-2 gap-y-2 text-sm font-medium mt-2 ">
            <span>Nama</span>
            <span className="text-right text-primary-hijauTua">
              {transactionData.customer_name}
            </span>

            <span>Judul Order</span>
            <span className="text-right text-primary-hijauTua">{item?.name}</span>

            <span>No Referensi</span>
            <span className="text-right text-primary-hijauTua">
              {transactionData.reference}
            </span>

            <span>Harga</span>
            <span className="text-right text-primary-hijauTua">
              Rp {item?.subtotal.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="mt-6 bg-green-100 px-4 py-3 rounded-lg flex justify-between font-bold text-primary-hijauTua">
            <span>Total Pembayaran</span>
            <span>
              Rp {transactionData.amount.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      {/* ================= POPUP INSTRUKSI ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <h3 className="text-xl font-bold mb-4 text-primary-hijauTua">
              Instruksi Pembayaran
            </h3>

            <div className="flex flex-col gap-4">
              {transactionData.instructions?.map((instruction, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    {instruction.title}
                  </h4>

                  <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                    {instruction.steps.map((step, i) => (
                      <li
                        key={i}
                        dangerouslySetInnerHTML={{ __html: step }}
                      />
                    ))}
                  </ol>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
