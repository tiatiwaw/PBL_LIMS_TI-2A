import React from "react";

const HeaderBar = ({ title }) => (
    <div className="bg-teal-500 rounded-lg p-3 shadow-md mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
);

const DetailRow = ({ label, value }) => (
    <div className="flex justify-start items-start py-1">
        <p className="text-gray-700 w-32 font-semibold">{label}</p>
        <span className="mr-4">:</span>
        <p className="text-gray-800 flex-1">{value || "-"}</p>
    </div>
);

export default function OrderForms3({ formData }) {
    const { selectedKlien, judulOrder, metodeAnalisis, tipeOrder, samples, tanggalOrder, estimasiSelesai } = formData;

    return (
        <div className="p-6 md:p-10 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto p-6 rounded-xl">
                {/* --- Bagian Klien --- */}
                <div className="mb-8">
                    <HeaderBar title="Client" />
                    <div className="px-4 py-2 space-y-2">
                        <DetailRow label="ID" value={selectedKlien?.id} />
                        <DetailRow label="Nama" value={selectedKlien?.name} />
                        <DetailRow label="Alamat" value={selectedKlien?.address} />
                        <DetailRow label="Nomor HP" value={selectedKlien?.phone_number} />
                    </div>
                </div>

                {/* --- Bagian Order --- */}
                <div>
                    <HeaderBar title="Order" />
                    <div className="px-4 py-2 space-y-2 mb-6">
                        <DetailRow label="Judul Order" value={judulOrder} />
                        <DetailRow label="Metode Analisis" value={metodeAnalisis} />
                        <DetailRow label="Tipe Order" value={tipeOrder} />
                    </div>

                    {/* --- Tabel Sample --- */}
                    <div className="mb-6">
                        <div className="bg-teal-500 text-white grid grid-cols-5 p-3 rounded-t-lg font-semibold text-sm shadow-inner">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-1">Nama</div>
                            <div className="col-span-1">Bentuk</div>
                            <div className="col-span-1">Kategori</div>
                            <div className="col-span-1">Kondisi</div>
                        </div>

                        {samples?.map((sample, index) => (
                            <div
                                key={sample.id}
                                className={`grid grid-cols-5 p-3 text-sm border-b ${
                                    index % 2 === 0 ? "bg-[#024D601A]" : "bg-white"
                                }`}
                            >
                                <div className="col-span-1 text-gray-600">{sample.id}</div>
                                <div className="col-span-1 font-medium text-gray-800">{sample.name}</div>
                                <div className="col-span-1">{sample.form}</div>
                                <div className="col-span-1">{sample.sample_category}</div>
                                <div className={`col-span-1 font-bold ${
                                    sample.condition === "damaged"
                                        ? "text-red-600"
                                        : sample.condition === "expired"
                                        ? "text-yellow-600"
                                        : "text-green-600"
                                }`}>
                                    {sample.condition}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- Tanggal dan Estimasi --- */}
                    <div className="px-4 py-2 space-y-2">
                        <DetailRow label="Tanggal Masuk" value={tanggalOrder} />
                        <DetailRow label="Estimasi Selesai" value={estimasiSelesai} />
                    </div>
                </div>
            </div>
        </div>
    );
}
