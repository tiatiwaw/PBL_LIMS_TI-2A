import DashboardLayout from "@/components/layouts/dashboard-layout";
import { NotebookText, Upload, FileText } from "lucide-react";
import React, { useState } from "react";

const History = () => {
    const user = {
        name: 'Nardo',
        role: 'Analyst',
        avatar: 'https://i.pravatar.cc/150?img=3',
    };

    const details = {
        kode: 'G-155',
        nama: 'Gas Metabolisme Tubuh',
        jenis: 'Gas',
        kuantitas: '5 ml',
        kondisi: 'Good',
        suhu: 18,
        tanggalMasuk: '2025-09-20',
        tanggalSelesai: '2025-09-25',
        hasil: 'Belum diunggah',
    };

    const [detail, setDetail] = useState(true);
    const [form, setForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDetail = () => {
        setDetail(true);
        setForm(false);
    };

    const handleForm = () => {
        setDetail(false);
        setForm(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file ? file.name : null);
    };

    return (
        <DashboardLayout title="Detail Sampel" user={user} header="Selamat Datang Analyst!">
            <div className="gap-4 flex flex-col items-center p-6 justify-center text-primary-hijauTua font-bold">
                {/* Tombol toggle */}
                <div className="flex w-3/4 justify-center">
                    <button
                        onClick={handleDetail}
                        className={`${detail ? "bg-primary-hijauTua text-white" : "cursor-pointer hover:bg-gray-300"} text-center w-full px-4 py-2 gap-6 rounded-l-full shadow-md`}
                    >
                        Detail
                    </button>
                    <button
                        onClick={handleForm}
                        className={`${form ? "bg-primary-hijauTua text-white" : "cursor-pointer hover:bg-gray-300"} text-center w-full px-4 py-2 gap-6 rounded-r-full shadow-md`}
                    >
                        Edit
                    </button>
                </div>

                {/* Header */}
                <div className="w-full bg-primary-hijauMuda h-10 px-10 rounded-md flex items-center gap-2 font-bold shadow-md">
                    <NotebookText /> Sampel
                </div>

                {/* Konten */}
                <div className="shadow-xl bg-white py-10 w-full min-h-60 rounded-xl p-4 flex flex-col gap-4">
                    {detail ? (
                        // ======= DETAIL MODE =======
                        <div className="grid grid-cols-2 w-3/4 gap-2">
                            <p>Kode Sampel</p><p>: {details.kode}</p>
                            <p>Nama Sampel</p><p>: {details.nama}</p>
                            <p>Jenis Sampel</p><p>: {details.jenis}</p>
                            <p>Kuantitas</p><p>: {details.kuantitas}</p>
                            <p>Kondisi</p><p>: {details.kondisi}</p>
                            <p>Suhu</p><p>: {details.suhu} °C</p>
                            <p>Tanggal Masuk</p><p>: {details.tanggalMasuk}</p>
                            <p>Tanggal Selesai</p><p>: {details.tanggalSelesai}</p>
                            <p>Hasil Pengujian</p><p>: {details.hasil}</p>
                        </div>
                    ) : (
                        // ======= FORM EDIT MODE =======
                        <form method="POST" className="flex justify-center gap-8" action="">
                            <div className="justify-between content-between grid grid-cols-2 gap-8">
                                <div className="flex flex-col">
                                    <label htmlFor="kode_sampel">Kode Sampel</label>
                                    <input
                                        value={details.kode}
                                        disabled
                                        type="text"
                                        name="kode_sampel"
                                        id="kode_sampel"
                                        className="rounded-md bg-primary-hijauTerang shadow-md ring-0 border-0"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="tanggal_selesai">Tanggal Selesai</label>
                                    <input
                                        type="date"
                                        name="tanggal_selesai"
                                        id="tanggal_selesai"
                                        defaultValue={details.tanggalSelesai}
                                        className="rounded-md bg-primary-hijauTerang shadow-md ring-0 border-0"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="jenis_sampel">Jenis Sampel</label>
                                    <select
                                        id="jenis_sampel"
                                        name="jenis_sampel"
                                        defaultValue={details.jenis}
                                        className="rounded-md bg-primary-hijauTerang shadow-md ring-0 border-0"
                                    >
                                        <option>Gas</option>
                                        <option>Cair</option>
                                        <option>Padat</option>
                                        <option>Lainnya</option>
                                    </select>
                                </div>

                                {/* KUANTITAS + SATUAN */}
                                <div className="flex flex-col">
                                    <label htmlFor="banyak_sampel">Kuantitas</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            name="banyak_sampel"
                                            id="banyak_sampel"
                                            defaultValue={parseFloat(details.kuantitas)}
                                            className="w-2/3 rounded-md bg-primary-hijauTerang shadow-md ring-0 border-0"
                                            placeholder="Masukkan jumlah"
                                        />
                                        <select
                                            id="satuan_sampel"
                                            name="satuan_sampel"
                                            defaultValue={details.kuantitas.split(' ')[1] || ''}
                                            className="w-1/3 rounded-md bg-primary-hijauTerang shadow-md ring-0 border-0"
                                        >
                                            <option value="">Satuan</option>
                                            <option value="ml">ml</option>
                                            <option value="l">liter</option>
                                            <option value="g">gram</option>
                                            <option value="kg">kilogram</option>
                                            <option value="cm">cm</option>
                                            <option value="m">meter</option>
                                            <option value="pcs">pcs</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="tanggal_masuk">Tanggal Masuk</label>
                                    <input
                                        type="date"
                                        name="tanggal_masuk"
                                        id="tanggal_masuk"
                                        defaultValue={details.tanggalMasuk}
                                        className="rounded-md bg-primary-hijauTerang shadow-md ring-0 border-0"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="kondisi_sampel">Kondisi Sampel</label>
                                    <select
                                        id="kondisi_sampel"
                                        name="kondisi_sampel"
                                        defaultValue={details.kondisi}
                                        className="rounded-md bg-primary-hijauTerang shadow-md ring-0 border-0"
                                    >
                                        <option>Good</option>
                                        <option>Average</option>
                                        <option>Bad</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col">
                                    <label htmlFor="suhu_sampel">Suhu Sampel</label>
                                    <input
                                        type="number"
                                        name="suhu_sampel"
                                        id="suhu_sampel"
                                        defaultValue={details.suhu}
                                        className="rounded-md bg-primary-hijauTerang shadow-md ring-0 border-0"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="hasil_pengujian" className="font-bold mb-2">
                                        Hasil Pengujian
                                    </label>

                                    <label
                                        htmlFor="hasil_pengujian"
                                        className="relative cursor-pointer w-full h-40 bg-primary-hijauTerang flex flex-col items-center justify-center rounded-lg shadow-md hover:bg-primary-hijauMuda transition duration-200"
                                    >
                                        <input
                                            type="file"
                                            name="hasil_pengujian"
                                            id="hasil_pengujian"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        {selectedFile ? (
                                            <div className="flex flex-col items-center justify-center text-center text-sm px-2">
                                                <FileText size={40} />
                                                {selectedFile}
                                            </div>
                                        ) : (
                                            <div className="h-3/4 justify-between flex flex-col items-center text-center">
                                                <p className="text-xs flex items-center">
                                                    <FileText size={20} /> File PDF hasil pengujian
                                                </p>
                                                <Upload size={30} className="text-gray-600" />
                                                <p className="text-xs">Tekan di sini untuk mengunggah</p>
                                            </div>
                                        )}
                                    </label>
                                </div>

                                <div className="flex justify-between gap-2">
                                    <button
                                        type="submit"
                                        className="px-3 py-2 ring-2 ring-primary-hijauTua bg-primary-hijauTua text-white hover:bg-primary-hijauGelap hover:ring-primary-hijauGelap rounded-md shadow-md w-full"
                                    >
                                        Simpan
                                    </button>
                                    <button
                                        type="reset"
                                        className="px-3 py-2 ring-2 ring-primary-hijauTua rounded-md shadow-md w-full hover:bg-gray-400"
                                        onClick={() => setSelectedFile(null)}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Tombol kembali */}
                <div className="w-full flex justify-end">
                    <a
                        href="."
                        className="cursor-pointer hover:bg-primary-hijauGelap bg-primary-hijauTua text-white rounded-full py-1 px-4"
                    >
                        Kembali
                    </a>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default History;
