import React from "react";

export default function PaymentSummary({ methods = [], diskon, admin }) {
    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    // ➤ Hitung subtotal otomatis dari semua metode analisis
    const subtotal = methods.reduce((acc, m) => acc + (m.harga || 0), 0);

    // ➤ PPN = 11% dari subtotal
    const ppn = Math.floor(subtotal * 0.11);

    const total = subtotal + ppn - diskon + admin;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mt-4">
            <h2 className="text-xl font-bold mb-5 text-gray-800">
                Ringkasan Pembayaran
            </h2>

            <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                    <span>Subtotal Pemesanan</span>
                    <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span>PPN (11%)</span>
                    <span>{formatRupiah(ppn)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Diskon</span>
                    <span>{diskon ? formatRupiah(diskon) : "Rp.-"}</span>
                </div>
                <div className="flex justify-between">
                    <span>Biaya Admin</span>
                    <span>{formatRupiah(admin)}</span>
                </div>
            </div>

            <div className="mt-5 p-4 bg-primary-hijauMuda/20 rounded-xl shadow font-semibold flex justify-between">
                <span>Total Pembayaran</span>
                <span className="text-lg">{formatRupiah(total)}</span>
            </div>

            <div className="text-right mt-5">
                <button className="bg-primary-hijauTua text-white px-6 py-2 rounded-xl hover:bg-primary-hijauGelap transition">
                    Lakukan Pembayaran
                </button>
            </div>
        </div>
    );
}
