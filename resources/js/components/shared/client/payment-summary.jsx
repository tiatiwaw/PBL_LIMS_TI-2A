import React from "react";

export default function PaymentSummary({ summary }) {
    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    if (!summary) return null;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mt-1">
            <h2 className="text-xl font-bold mb-5 text-gray-800">
                Ringkasan Pembayaran
            </h2>

            <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                    <span>Subtotal Pemesanan</span>
                    <span className="text-primary-hijauTua">
                        {formatRupiah(summary.subtotal)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Biaya Admin</span>
                    <span className="text-primary-hijauTua">
                        {formatRupiah(summary.admin)}
                    </span>
                </div>
            </div>

            <div className="w-full bg-green-100 px-4 py-3 rounded-lg flex justify-between text-lg font-bold border border-green-200 mt-4">
                <span>Total Pembayaran</span>
                <span className="text-lg text-primary-hijauTua">
                    {formatRupiah(summary.total)}
                </span>
            </div>
        </div>
    );
}
