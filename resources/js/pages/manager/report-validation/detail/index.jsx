import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    User,
    Settings,
    ArrowLeft,
    FileText,
    Calendar,
    Building2,
    Microscope,
    Package,
    Link2,
    Check,
    Wrench,
} from "lucide-react";
import { detailOrder } from "@/data/manager/detail";

export default function DetailOrder({ auth }) {
    const [activeTab, setActiveTab] = useState("parameter");
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };

    return (
        <DashboardLayout title="Orders" user={currentUser} header="Orders">
            <div className="min-h-screen bg-white rounded-md">
                <div className="relative max-w-[1600px] mx-auto px-8 py-10 space-y-4">
                    <div className="flex items-start justify-between mb-8">
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-4xl font-bold bg-primary-hijauTua bg-clip-text text-transparent mb-2">
                                        Uji Kualitas Produk Nugget Ayam
                                    </h1>
                                    <Badge variant="urgent">
                                        {detailOrder.orderInfo.status}
                                    </Badge>
                                </div>
                                <p className="text-slate-500 text-lg font-medium">
                                    Order ID:{" "}
                                    <span className="text-slate-700 font-semibold">
                                        {detailOrder.orderInfo.orderId}
                                    </span>
                                </p>
                            </div>

                            <div className="flex items-center gap-8 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Calendar className="w-4 h-4 text-teal-600" />
                                    <span>
                                        Tanggal Order:{" "}
                                        <span className="font-medium text-slate-700">
                                            {detailOrder.orderInfo.orderDate}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Calendar className="w-4 h-4 text-cyan-600" />
                                    <span>
                                        Estimasi Selesai:{" "}
                                        <span className="font-medium text-slate-700">
                                            {detailOrder.orderInfo.estimatedDate}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button className="bg-white hover:bg-primary-hijauTerang text-primary-hijauTua border border-primary-hijauTua shadow-lg hover:shadow-xl transition-all duration-300 px-6">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                    </div>

                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-100 p-2">
                            <TabsList className="bg-transparent w-full justify-start h-auto p-0 gap-2">
                                <TabsTrigger
                                    value="sample"
                                    className="rounded-xl px-8 py-3 data-[state=active]:bg-primary-hijauTua data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 font-medium"
                                >
                                    Sample
                                </TabsTrigger>
                                <TabsTrigger
                                    value="parameter"
                                    className="rounded-xl px-8 py-3 data-[state=active]:bg-primary-hijauTua data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 font-medium"
                                >
                                    Parameter & Metode Uji
                                </TabsTrigger>
                                <TabsTrigger
                                    value="alat&bahan"
                                    className="rounded-xl px-8 py-3 data-[state=active]:bg-primary-hijauTua data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 font-medium"
                                >
                                    Alat & Bahan
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="parameter" className="space-y-8">
                            <Card className="border border-neutral-100 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-primary-hijauTua">
                                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                                                    #
                                                </th>
                                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                                                    Kategori
                                                </th>
                                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                                                    Nama
                                                </th>
                                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                                                    Bentuk
                                                </th>
                                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                                                    Metode Pengawetan
                                                </th>
                                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                                                    Volume
                                                </th>
                                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                                                    Kondisi
                                                </th>
                                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                                                    Temperatur
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {detailOrder.samples.map(
                                                (sample, index) => (
                                                    <tr
                                                        key={sample.id}
                                                        className={`border-b border-slate-100 hover:bg-primary-hijauTua/5 transition-all duration-200 ${
                                                            index % 2 === 0
                                                                ? "bg-slate-50/30"
                                                                : "bg-white"
                                                        }`}
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="w-8 h-8 rounded-full bg-primary-hijauTua flex items-center justify-center text-white font-semibold text-sm">
                                                                {sample.id}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-700 font-medium">
                                                            {sample.kategori}
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-700 font-medium">
                                                            {sample.nama}
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-600">
                                                            {sample.bentuk}
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-600">
                                                            {
                                                                sample.metodePengawetan
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <Badge variant="eksternal">
                                                                {sample.volume}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                                <span className="text-slate-700 font-medium">
                                                                    {
                                                                        sample.kondisi
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-600">
                                                            {sample.temperatur}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="sample">
                            <Card className="border border-neutral-100 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-20 text-center">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-hijauTua flex items-center justify-center">
                                        <Package className="w-10 h-10 text-white" />
                                    </div>
                                    <p className="text-slate-400 text-lg font-medium">
                                        Content for Sample tab
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="alat&bahan">
                            <Card className="border border-neutral-100 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-20 text-center">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-hijauTua flex items-center justify-center">
                                        <Wrench className="w-10 h-10 text-white" />
                                    </div>
                                    <p className="text-slate-400 text-lg font-medium">
                                        Content for Alat & Bahan tab
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <div className="xl:col-span-2">
                            <Card className="border border-neutral-100 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                                <CardHeader className=" border-b border-slate-100">
                                    <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        Tim Analis
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {detailOrder.analysts.map(
                                            (analyst, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative overflow-hidden rounded-2xl bg-primary-hijauTua/5 p-5 border border-slate-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative">
                                                            <div className="w-14 h-14 rounded-2xl bg-primary-hijauMuda flex items-center justify-center shadow-lg">
                                                                <User className="w-7 h-7 text-white" />
                                                            </div>
                                                            {analyst.verified && (
                                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
                                                                    <Check className="w-3 h-3 text-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-slate-800 mb-1">
                                                                {analyst.name}
                                                            </h4>
                                                            <p className="text-sm text-slate-600 font-medium">
                                                                {analyst.role}
                                                            </p>
                                                        </div>
                                                        <Settings className="w-5 h-5 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="border border-neutral-100 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                                <CardHeader className="border-b border-slate-100 pb-4">
                                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-white" />
                                        </div>
                                        Detail Order
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-5">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                            <Building2 className="w-4 h-4" />
                                            <span>Client</span>
                                        </div>
                                        <p className="font-bold text-slate-800 text-lg pl-6">
                                            {detailOrder.orderDetail.client}
                                        </p>
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                            <Microscope className="w-4 h-4" />
                                            <span>Metode Analisis</span>
                                        </div>
                                        <p className="font-bold text-slate-800 pl-6">
                                            {
                                                detailOrder.orderDetail
                                                    .metodeAnalisis
                                            }
                                        </p>
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                            <Package className="w-4 h-4" />
                                            <span>Tipe Order</span>
                                        </div>
                                        <p className="font-bold text-slate-800 pl-6">
                                            {detailOrder.orderDetail.tipeOrder}
                                        </p>
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Laporan Terbit</span>
                                        </div>
                                        <p className="font-bold text-slate-800 pl-6">
                                            {
                                                detailOrder.orderDetail
                                                    .laporanTerbit
                                            }
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border border-neutral-100 shadow-2xl bg-primary-hijauMuda text-white overflow-hidden">
                                <CardHeader className="border-b border-white/20 pb-4">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-bold flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <Link2 className="w-4 h-4" />
                                            </div>
                                            Lokasi File
                                        </CardTitle>
                                        <Button className="bg-white/20 hover:bg-white/30 text-white border border-neutral-100 backdrop-blur-sm shadow-lg transition-all duration-300">
                                            <Link2 className="w-4 h-4 mr-2" />
                                            Path
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-2">
                                        <p className="font-bold text-sm text-white/90">
                                            Catatan:
                                        </p>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                            <p className="text-sm leading-relaxed">
                                                {detailOrder.notes}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
