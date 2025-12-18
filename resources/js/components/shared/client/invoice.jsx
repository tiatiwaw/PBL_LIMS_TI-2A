import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { router } from "@inertiajs/react";


const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
};

export default function InvoiceReceipt({ invoice}) {
  const invoiceRef = useRef();

  if (!invoice) return null;

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
    pdf.save(`invoice-${invoice.order.order_number}.pdf`);
  };

  const handleSavePDFToServer = async () => {
  const element = invoiceRef.current;
  if (!element) return;

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

  const pdfBlob = pdf.output("blob");

  const formData = new FormData();
  formData.append(
    "invoice_pdf",
    pdfBlob,
    `invoice-${invoice.order.order_number}.pdf`
  );
  formData.append("order_number", invoice.order.order_number);

  try {
    const response = await fetch("/api/v1/client/orders/save-invoice-pdf", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload gagal - status: " + response.status);
    }

    const result = await response.json();
    console.log("PDF berhasil disimpan:", result.path);

  } catch (error) {
    console.error("Gagal upload PDF:", error.message);
  }
};



  // Otomatis simpan PDF ke server saat invoice tersedia
  useEffect(() => {
    if (invoice) {
      handleSavePDFToServer();
    }
  }, [invoice]);


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

        {/* TOTAL */}
        <div className="p-5 text-center">
          <p className="text-sm text-gray-500">Total Pembayaran</p>
          <p className="text-3xl font-bold text-primary-hijauTua">
            {formatRupiah(invoice.amount)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
             Tanggal Pembayaran :{invoice.payment_date}
          </p>
        </div>

        {/* DETAIL ORDER */}
        <div className="px-5 pb-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">No Order</span>
            <span className="font-medium text-primary-hijauTua">{invoice.order.order_number}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Judul</span>
            <span className="font-medium text-primary-hijauTua">{invoice.order.title}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Tanggal Pemesanan</span>
            <span className="font-medium text-primary-hijauTua">
              {new Date(invoice.order_date).toISOString().split('T')[0]}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Nama Client</span>
            <span className="font-medium text-primary-hijauTua">{invoice.order.customer_name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Jenis Transaksi</span>
            <span className="font-medium text-primary-hijauTua">{invoice.payment_method}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="font-medium text-primary-hijauTua">{invoice.status}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Reference</span>
            <span className="font-medium text-primary-hijauTua">{invoice.reference}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Merchant Ref</span>
            <span className="font-medium text-primary-hijauTua">{invoice.merchant_ref}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium text-primary-hijauTua">{formatRupiah(invoice.order.subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Admin</span>
            <span className="font-medium text-primary-hijauTua">{formatRupiah(invoice.order.admin)}</span>
          </div>

        </div>

        {/* FOOTER TOTAL */}
        <div className="bg-green-50 px-5 py-4 flex justify-between font-bold border-t">
          <span className="text-primary-hijauTua">Total</span>
          <span className="text-primary-hijauTua">{formatRupiah(invoice.amount)}</span>
        </div>
      </div>

      {/* TOMBOL UNDUH */}
      <div className="mt-6 flex justify-between gap-3">
        <Button onClick={handleDownloadPDF} className="w-full bg-primary-hijauTua text-white">
          Unduh Invoice
        </Button>

        <Button
          variant="outline"
          onClick={() => router.get(route("client.index"))}
          className="w-full border-primary-hijauTua text-primary-hijauTua"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
}
