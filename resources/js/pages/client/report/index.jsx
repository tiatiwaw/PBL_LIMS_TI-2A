// resources/js/pages/client/report/index.jsx
import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { FileDown } from "lucide-react";

export default function ClientReport({ auth }) {
  const reportData = {
    orderNumber: "ORDER-ORD-20251202-0014",
    date: "03 Desember 2025",
    client: {
      name: "Dwight Johns III",
      address: "Jl. Raya Denpasar No. 10, Bali",
    },
    samples: [
      {
        name: "Sampel Urgent 1",
        parameter: "Kadar Air",
        result: "200",
        standard: "SNI 01-2891-1992",
        unit: "%",
        reference: "SNI Metodologi",
      },
      {
        name: "Sampel Urgent 2",
        parameter: "Total Plate Count",
        result: "rendah",
        standard: "ISO 4833:2013",
        unit: "CFU/mL",
        reference: "SNI Metodologi",
      },
    ],
    supervisorNote: "suksesss",
    approvals: [
      { role: "Analis Laboratorium", date: "03/12/2025" },
      { role: "Supervisor Laboratorium", date: "03/12/2025" },
      { role: "Manager Laboratorium", date: "03/12/2025" },
    ],
  };

  return (
    <DashboardLayout title="Laporan Hasil Uji" header="Laporan Hasil Uji">
      <div className="w-full max-w-5xl mx-auto text-primary-hijauTua p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">

          {/* Header */}
          <h1 className="text-2xl font-bold text-center mb-6">LAPORAN HASIL UJI</h1>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-2 text-sm font-medium mb-6">
            <span className="text-gray-600">Order Number</span>
            <span>: {reportData.orderNumber}</span>

            <span className="text-gray-600">Tanggal</span>
            <span>: {reportData.date}</span>

            <span className="text-gray-600">Nama Client</span>
            <span>: {reportData.client.name}</span>

            <span className="text-gray-600">Alamat</span>
            <span>: {reportData.client.address}</span>
          </div>

          {/* Table Hasil Uji */}
          <h2 className="text-xl font-bold mb-4 text-gray-800">Hasil Pengujian</h2>
          <table className="w-full border border-gray-300 text-sm mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Nama Sampel</th>
                <th className="border px-3 py-2 text-left">Parameter</th>
                <th className="border px-3 py-2 text-left">Hasil</th>
                <th className="border px-3 py-2 text-left">Standar</th>
                <th className="border px-3 py-2 text-left">Satuan</th>
                <th className="border px-3 py-2 text-left">Referensi</th>
              </tr>
            </thead>
            <tbody>
              {reportData.samples.map((s, idx) => (
                <tr key={idx}>
                  <td className="border px-3 py-2">{s.name}</td>
                  <td className="border px-3 py-2">{s.parameter}</td>
                  <td className="border px-3 py-2">{s.result}</td>
                  <td className="border px-3 py-2">{s.standard}</td>
                  <td className="border px-3 py-2">{s.unit}</td>
                  <td className="border px-3 py-2">{s.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Catatan Supervisor */}
          <h2 className="text-xl font-bold mb-4 text-gray-800">Catatan Supervisor</h2>
          <p className="text-sm text-gray-700 mb-6">{reportData.supervisorNote}</p>

          {/* Persetujuan / Tanda Tangan */}
          <h2 className="text-xl font-bold mb-4 text-gray-800">Persetujuan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6 mt-10">
            {reportData.approvals.map((a, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-semibold">{a.role}</span>
                <div className="h-20 w-full border-b border-gray-400 my-2"></div>
                <span className="text-sm text-gray-600">{a.date}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <Link href={route("client.index")}>
              <Button className="bg-primary-hijauTua text-white hover:bg-primary-hijauGelap">
                Kembali
              </Button>
            </Link>

            <Button className="bg-primary-hijauTua text-white hover:bg-primary-hijauGelap flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              Unduh Laporan
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}