import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import InvoiceReceipt from "@/components/shared/client/invoice.jsx";
import invoiceData from "@/data/client/invoice";

export default function InvoicePage() {
  const [selectedInvoice, setSelectedInvoice] = useState(invoiceData[0]);

  return (
    <DashboardLayout title="Invoice" header="Detail Invoice">
      {selectedInvoice ? (
        <InvoiceReceipt
          invoice={selectedInvoice}
          onBack={() => window.history.back()}
        />
      ) : (
        <div className="text-center py-20 text-gray-500">
          Tidak ada data invoice
        </div>
      )}
    </DashboardLayout>
  );
}
