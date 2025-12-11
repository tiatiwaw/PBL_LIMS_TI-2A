// /components/shared/analyst/profile-analyst.jsx

import { useState } from "react";

export default function ProfileAnalyst({ profile }) {

    const [pdfPreview, setPdfPreview] = useState(null);

    if (!analyst) {
        return (
            <div className="max-w-5xl mx-auto mt-10 text-center">
                <p className="text-red-600 font-semibold">
                    Data analyst tidak ditemukan.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">

            {/* HEADER */}
            <div className="bg-teal-900 text-white p-4 rounded-xl">
                <h1 className="text-xl font-semibold">
                    Selamat Datang, {analyst.name}!
                </h1>
                <p className="text-sm opacity-80">
                    Analyst • {analyst.specialist}
                </p>
            </div>

            {/* PROFILE CARD */}
            <div className="bg-white shadow-md rounded-xl p-6 flex justify-between gap-6">

                {/* LEFT PROFILE */}
                <div className="w-1/3 bg-teal-800 text-white rounded-xl p-4 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-300 mb-3"></div>

                    <h2 className="text-lg font-semibold">{analyst.name}</h2>
                    <p className="text-sm opacity-80">{analyst.specialist}</p>
                </div>

                {/* RIGHT PROFILE INFO */}
                <div className="w-2/3 bg-gray-50 p-4 rounded-xl space-y-2">
                    <Detail label="Nama" value={analyst.name} />
                    <Detail label="Specialist" value={analyst.specialist} />
                    <Detail label="Email" value={user.email} />
                </div>
            </div>

            {/* CERTIFICATES */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Sertifikat</h3>

                <div className="grid grid-cols-2 gap-4">
                    {analyst.certificates?.map((cert, i) => (
                        <div
                            key={i}
                            className="border p-4 rounded-xl cursor-pointer hover:bg-gray-100"
                            onClick={() => setPdfPreview(cert.file_path)}
                        >
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Klik untuk melihat PDF
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* PDF PREVIEW */}
            {pdfPreview && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-4 w-3/4 h-3/4 relative">
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => setPdfPreview(null)}
                        >
                            X
                        </button>

                        <iframe
                            src={`/${pdfPreview}`}
                            className="w-full h-full rounded"
                        ></iframe>
                    </div>
                </div>
            )}

            {/* TRAININGS */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Training</h3>

                <div className="space-y-3">
                    {analyst.trainings?.map((t, i) => (
                        <div key={i} className="p-3 border rounded-xl bg-gray-50">
                            <p className="font-medium">{t.name}</p>
                            <p className="text-sm">{t.provider}</p>
                            <p className="text-xs text-gray-500">{t.date}</p>
                            <p className="text-xs text-green-700 font-semibold mt-1">
                                {t.result}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div className="flex text-sm">
            <span className="w-32 font-semibold">{label}</span>
            <span>: {value}</span>
        </div>
    );
}
import { useEffect, useState } from "react";
import { analystService } from "@/services/analystService";

export default function ProfileAnalyst({ user }) {
    const [analyst, setAnalyst] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pdfPreview, setPdfPreview] = useState(null);

    useEffect(() => {
        if (!user?.id) return;

        analystService.getById(user.id)
            .then(res => setAnalyst(res.data))
            .finally(() => setLoading(false));
    }, [user]);

    if (loading) return <p>Loading...</p>;

    if (!analyst) {
        return (
            <div className="max-w-5xl mx-auto mt-10 text-center">
                <p className="text-red-600 font-semibold">
                    Data analyst tidak ditemukan.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">

            {/* HEADER – sama client punya, tapi isinya analyst */}
            <div className="bg-teal-900 text-white p-4 rounded-xl">
                <h1 className="text-xl font-semibold">
                    Selamat Datang, {analyst.name}!
                </h1>
                <p className="text-sm opacity-80">
                    Analyst • {analyst.specialist}
                </p>
            </div>

            {/* PROFILE CARD – strukturnya sama client */}
            <div className="bg-white shadow-md rounded-xl p-6 flex justify-between gap-6">

                <div className="w-1/3 bg-teal-800 text-white rounded-xl p-4 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-300 mb-3"></div>
                    <h2 className="text-lg font-semibold">{analyst.name}</h2>
                    <p className="text-sm opacity-80">{analyst.specialist}</p>
                </div>

                <div className="w-2/3 bg-gray-50 p-4 rounded-xl space-y-2">
                    <Detail label="Nama" value={analyst.name} />
                    <Detail label="Email" value={user.email} />
                    <Detail label="Specialist" value={analyst.specialist} />
                    <Detail label="Pengalaman" value={analyst.experience ?? "-"} />
                </div>
            </div>

            {/* CERTIFICATE SECTION */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Sertifikat</h3>

                <div className="grid grid-cols-2 gap-4">
                    {analyst.certificates?.map((cert, i) => (
                        <div
                            key={i}
                            className="border p-4 rounded-xl cursor-pointer hover:bg-gray-100"
                            onClick={() => setPdfPreview(cert.file_path)}
                        >
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Klik untuk melihat PDF
                            </p>
                        </div>
                    ))}
                </div>

                {analyst.certificates?.length === 0 && (
                    <p className="text-gray-500 text-sm">Belum ada sertifikat.</p>
                )}
            </div>

            {/* TRAINING SECTION */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Training</h3>

                <div className="space-y-3">
                    {analyst.trainings?.map((t, i) => (
                        <div key={i} className="p-3 border rounded-xl bg-gray-50">
                            <p className="font-medium">{t.name}</p>
                            <p className="text-sm">{t.provider}</p>
                            <p className="text-xs text-gray-500">{t.date}</p>
                            <p className="text-xs text-green-700 font-semibold mt-1">
                                {t.result}
                            </p>
                        </div>
                    ))}
                </div>

                {analyst.trainings?.length === 0 && (
                    <p className="text-gray-500 text-sm">Belum ada training.</p>
                )}
            </div>

            {/* PDF PREVIEW */}
            {pdfPreview && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-4 w-3/4 h-3/4 relative">
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => setPdfPreview(null)}
                        >
                            X
                        </button>

                        <iframe
                            src={`/${pdfPreview}`}
                            className="w-full h-full rounded"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div className="flex text-sm">
            <span className="w-32 font-semibold">{label}</span>
            <span>: {value}</span>
        </div>
    );
}
