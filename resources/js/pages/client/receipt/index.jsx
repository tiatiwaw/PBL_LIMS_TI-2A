import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import InvoiceReceipt from "@/components/shared/client/invoice.jsx";
import { useReceipt } from "@/hooks/useClient";
import { XCircle } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";

export default function InvoicePage({ order_number }) {
  const { data, isLoading, isError, errorMessage } = useReceipt(order_number);
  console.log("Order number:", order_number);
  console.log("Data:", data);


  
  if (isLoading) {
    return (
      <DashboardLayout title="Invoice" header="Memuat Data...">
          <Loading/>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout title="Invoice" header="Terjadi Kesalahan">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <XCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-lg font-semibold text-red-600">
            {errorMessage || "Gagal memuat data invoice."}
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

  return (
    <DashboardLayout title="Invoice" header="Detail Invoice">
      {data?.data ? (
        <InvoiceReceipt
          invoice={data.data} 
        />
      ) : (
        <div className="text-center py-20 text-gray-500">
          Tidak ada data invoice
        </div>
      )}
    </DashboardLayout>
  );

}
