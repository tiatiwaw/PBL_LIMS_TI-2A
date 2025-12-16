import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportPreview({
    reportData,
    analyst,
    supervisor,
    manager,
}) {
    if (!reportData || reportData.length === 0) {
        return (
            <div className="p-4 bg-red-100 border border-red-300 rounded text-red-800">
                Tidak ada data sampel untuk ditampilkan
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="border-t border-b py-4">
                <h1 className="text-2xl font-bold text-center mb-2">
                    LAPORAN HASIL UJI
                </h1>
                <p className="text-center text-sm text-gray-600">
                    Tanggal:{" "}
                    {new Date().toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>

            {reportData.map((sampleData, index) => (
                <Card key={index}>
                    <CardHeader className="bg-gray-50 border-b">
                        <CardTitle className="text-lg">
                            Sampel: {sampleData.sample}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {sampleData.parameters &&
                        sampleData.parameters.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold w-12">
                                                No
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                                                Nama Parameter
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold w-24">
                                                Hasil
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold w-40">
                                                Baku Mutu
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold w-32">
                                                Satuan
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold w-40">
                                                Standar Acuan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sampleData.parameters.map(
                                            (param, paramIndex) => (
                                                <tr key={paramIndex}>
                                                    <td className="border border-gray-300 px-4 py-2 text-center text-sm">
                                                        {paramIndex + 1}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        {param.parameter_name}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center text-sm">
                                                        {param.result}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        {param.quality}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        {param.unit}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm">
                                                        {param.reference}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-4 bg-yellow-100 border border-yellow-300 rounded text-yellow-800">
                                Tidak ada parameter untuk sampel ini
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}

            <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-6 font-semibold">
                    Pengesahan Laporan:
                </p>

                <div className="grid grid-cols-3 gap-8">
                    {/* Analis Laboratorium */}
                    <div className="text-center">
                        <div className="border-b-2 border-gray-800 h-20 mb-2 flex items-center justify-center">
                            {analyst?.signature ? (
                                <img
                                    src={analyst.signature}
                                    alt="Analis Signature"
                                    className="max-h-16 max-w-24 object-contain"
                                />
                            ) : (
                                <span className="text-xs text-gray-400">
                                    Tanda Tangan
                                </span>
                            )}
                        </div>
                        <p className="font-semibold text-sm">
                            Analis Laboratorium
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                            {analyst?.name || "Nama"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {new Date().toLocaleDateString("id-ID")}
                        </p>
                    </div>

                    {/* Supervisor Laboratorium */}
                    <div className="text-center">
                        <div className="border-b-2 border-gray-800 h-20 mb-2 flex items-center justify-center">
                            {supervisor?.signature ? (
                                <img
                                    src={supervisor.signature}
                                    alt="Supervisor Signature"
                                    className="max-h-16 max-w-24 object-contain"
                                />
                            ) : (
                                <span className="text-xs text-gray-400">
                                    Tanda Tangan
                                </span>
                            )}
                        </div>
                        <p className="font-semibold text-sm">
                            Supervisor Laboratorium
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                            {supervisor?.name || "Nama"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {new Date().toLocaleDateString("id-ID")}
                        </p>
                    </div>

                    {/* Manager Laboratorium */}
                    <div className="text-center">
                        <div className="border-b-2 border-gray-800 h-20 mb-2 flex items-center justify-center">
                            {manager?.signature ? (
                                <img
                                    src={manager.signature}
                                    alt="Manager Signature"
                                    className="max-h-16 max-w-24 object-contain"
                                />
                            ) : (
                                <span className="text-xs text-gray-400">
                                    Tanda Tangan
                                </span>
                            )}
                        </div>
                        <p className="font-semibold text-sm">
                            Manager Laboratorium
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                            {manager?.name || "Nama"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">-</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
