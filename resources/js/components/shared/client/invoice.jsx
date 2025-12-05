import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
};

export default function InvoiceReceipt({ invoice, onBack }) {
  const invoiceRef = useRef();

  if (!invoice) return null;

  // FUNGSI DOWNLOAD PDF
  const handleDownloadPDF = async () => {
  const element = invoiceRef.current;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  const imgWidth = 210; 
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight]);

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save(`invoice-${invoice.no_order}.pdf`);
};


  return (
    <div className="w-full max-w-md mx-auto p-4">

      <div ref={invoiceRef} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

        {/* HEADER */}
        <div className="p-5 text-center border-b">
            <span className="block text-lg font-bold text-primary-hijauTua tracking-wide mb-2">
                LABOO
            </span>

            <div className="flex justify-center mb-2">
                <CheckCircle className="w-12 h-12 text-primary-hijauTua" />
            </div>

            <h1 className="text-xl font-bold text-primary-hijauTua">
                Pembayaran Berhasil
            </h1>

            <p className="text-gray-500 text-sm mt-1">
                Terima kasih atas pembayaran Anda
            </p>
        </div>


       
        <div className="p-5 text-center">
          <p className="text-sm text-gray-500">Total Pembayaran</p>
          <p className="text-3xl font-bold text-primary-hijauTua">
            {formatRupiah(invoice.total_harga)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {invoice.waktu_pembayaran}
          </p>
        </div>

        {/* DETAIL */}
        <div className="px-5 pb-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">No Order</span>
            <span className="font-medium text-primary-hijauTua">{invoice.no_order}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Judul</span>
            <span className="font-medium text-primary-hijauTua">{invoice.judul}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Nama Client</span>
            <span className="font-medium text-primary-hijauTua">{invoice.nama_client}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Jenis Transaksi</span>
            <span className="font-medium text-primary-hijauTua">{invoice.jenis_transaksi}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Nama Merchant</span>
            <span className="font-medium text-primary-hijauTua">{invoice.nama_merchant}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Lokasi Merchant</span>
            <span className="font-medium text-primary-hijauTua">{invoice.lokasi_merchant}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Nama Penerbit</span>
            <span className="font-medium text-primary-hijauTua">{invoice.nama_penerbit}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Nama Pengakuisisi</span>
            <span className="font-medium text-primary-hijauTua">{invoice.nama_pengakuisisi}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Merchant PAN</span>
            <span className="font-medium text-primary-hijauTua">{invoice.merchant_pan}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Client PAN</span>
            <span className="font-medium text-primary-hijauTua">{invoice.client_pan}</span>
          </div>
        </div>

        {/* FOOTER TOTAL */}
        <div className="bg-green-50 px-5 py-4 flex justify-between font-bold border-t">
          <span className="text-primary-hijauTua">Total</span>
          <span className="text-primary-hijauTua">
            {formatRupiah(invoice.total_harga)}
          </span>
        </div>
      </div>

      {/* TOMBOL UNDUH */}
      <div className="mt-6 flex justify-between gap-3">
        <Button 
          onClick={handleDownloadPDF}
          className="w-full bg-primary-hijauTua text-white"
        >
          Unduh Invoice
        </Button>

        <Button
          variant="outline"
          onClick={onBack}
          className="w-full border-primary-hijauTua text-primary-hijauTua"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
}
