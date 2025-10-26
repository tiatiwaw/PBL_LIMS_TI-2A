import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    TestTube,
    Beaker,
    Clock,
    FileCheck,
    Thermometer,
    Droplet,
    TestTube2,
    Gauge,
    ArrowDown,
    Pencil,
} from "lucide-react";
import { detailOrder } from "@/data/manager/detail";
import DashboardLayout from "@/components/layouts/dashboard-layout";

export default function DetailOrder({ auth }) {
    const [selectedSampleId, setSelectedSampleId] = useState(
        detailOrder.samples[0].id.toString()
    );

    const selectedSample = detailOrder.samples.find(
        (sample) => sample.id.toString() === selectedSampleId
    );

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };

    const getOrderType = (type) => {
        switch (type) {
            case "internal":
                return "Internal";
            case "external":
                return "Eksternal";
            case "urgent":
                return "Urgent";
            default:
                return "Unknown";
        }
    };

    const getOrderTypeVariant = (type) => {
        switch (type) {
            case "internal":
                return "info";
            case "external":
                return "warning";
            case "urgent":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <DashboardLayout title="Orders" user={currentUser} header="Orders">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-4xl font-bold text-teal-800">
                                Uji Kualitas Produk Nugget Ayam
                            </h1>
                            <Badge
                                variant={getOrderTypeVariant(
                                    detailOrder.orderType
                                )}
                            >
                                {getOrderType(detailOrder.orderType)}
                            </Badge>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-primary-hijauTua/80">
                                <Calendar className="w-4 h-4 text-teal-600" />
                                <span>
                                    Tanggal Order:{" "}
                                    <span className="font-medium text-primary-hijauTua">
                                        {detailOrder.orderDate}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-primary-hijauTua/80">
                                <Calendar className="w-4 h-4 text-cyan-600" />
                                <span>
                                    Estimasi Selesai:{" "}
                                    <span className="font-medium text-primary-hijauTua">
                                        {detailOrder.estimatedDate}
                                    </span>
                                </span>
                            </div>
                            <Button className="flex items-center justify-center gap-2.5 px-5 py-2.5 bg-white text-primary-hijauTua font-semibold border border-primary-hijauTua rounded-lg shadow-sm transition-all duration-200 hover:bg-primary-hijauTua hover:text-white hover:shadow-md">
                                <span>Download</span>
                                <ArrowDown className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    <Button className="flex items-center justify-center gap-2.5 px-5 py-2.5 bg-white text-primary-hijauTua font-semibold border border-primary-hijauTua rounded-lg shadow-sm transition-all duration-200 hover:bg-primary-hijauTua hover:text-white hover:shadow-md">
                        <span>Kembali</span>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </div>

                <Card className="border border-slate-200 shadow-xl bg-white">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="text-2xl font-bold text-primary-hijauTua flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center">
                                <TestTube2 className="w-5 h-5 text-white" />
                            </div>
                            Pilih Sample
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Select
                            value={selectedSampleId}
                            onValueChange={setSelectedSampleId}
                        >
                            <SelectTrigger className="w-full h-12 text-base border-2 border-slate-200 hover:border-teal-500 transition-colors">
                                <SelectValue placeholder="Pilih sample..." />
                            </SelectTrigger>
                            <SelectContent>
                                {detailOrder.samples.map((sample) => (
                                    <SelectItem
                                        key={sample.id}
                                        value={sample.id.toString()}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center text-white font-semibold text-sm">
                                                {sample.id}
                                            </div>
                                            <span className="font-medium">
                                                {sample.nama}
                                            </span>
                                            <Badge
                                                variant="success"
                                                className="ml-2"
                                            >
                                                {sample.kategori}
                                            </Badge>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {selectedSample && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border border-slate-200 shadow-xl bg-white">
                            <CardHeader className="bg-primary-hijauTua text-white rounded-t-2xl">
                                <CardTitle className="text-xl font-bold flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                                        <TestTube className="w-5 h-5" />
                                    </div>
                                    Informasi Sample
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Package className="w-4 h-4" />
                                            <span>Nama Sample</span>
                                        </div>
                                        <p className="font-bold text-primary-hijauTua text-lg">
                                            {selectedSample.nama}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <FileText className="w-4 h-4" />
                                            <span>Kategori</span>
                                        </div>
                                        <Badge variant="success">
                                            {selectedSample.kategori}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Beaker className="w-4 h-4" />
                                            <span>Bentuk</span>
                                        </div>
                                        <p className="font-bold text-primary-hijauTua">
                                            {selectedSample.bentuk}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Droplet className="w-4 h-4" />
                                            <span>Volume</span>
                                        </div>
                                        <Badge variant="success">
                                            {selectedSample.volume} ml
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Thermometer className="w-4 h-4" />
                                            <span>Temperatur</span>
                                        </div>
                                        <p className="font-bold text-primary-hijauTua">
                                            {selectedSample.temperatur}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Check className="w-4 h-4" />
                                            <span>Kondisi</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span className="font-bold text-primary-hijauTua">
                                                {selectedSample.kondisi}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                                        <Wrench className="w-4 h-4" />
                                        <span>Metode Pengawetan</span>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                        <p className="text-primary-hijauTua font-medium">
                                            {selectedSample.metodePengawetan}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card className="border border-slate-200 shadow-xl bg-white">
                                <CardHeader className="bg-primary-hijauTua text-white rounded-t-2xl">
                                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                                            <Gauge className="w-5 h-5" />
                                        </div>
                                        Parameter Uji
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <TestTube className="w-4 h-4" />
                                            <span>Nama Parameter</span>
                                        </div>
                                        <p className="font-bold text-primary-hijauTua text-lg">
                                            {selectedSample.parameter.name}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <FileText className="w-4 h-4" />
                                            <span>Kategori</span>
                                        </div>
                                        <Badge variant="success">
                                            {selectedSample.parameter.category}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Beaker className="w-4 h-4" />
                                            <span>Detection Limit</span>
                                        </div>
                                        <p className="font-bold text-primary-hijauTua">
                                            {
                                                selectedSample.parameter
                                                    .detectionLimit
                                            }
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border border-slate-200 shadow-xl bg-white">
                                <CardHeader className="bg-primary-hijauTua text-white rounded-t-2xl">
                                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                                            <Microscope className="w-5 h-5" />
                                        </div>
                                        Metode Uji
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <FileText className="w-4 h-4" />
                                            <span>Nama Metode</span>
                                        </div>
                                        <p className="font-bold text-primary-hijauTua text-lg">
                                            {selectedSample.method.name}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Link2 className="w-4 h-4" />
                                            <span>Referensi</span>
                                        </div>
                                        <p className="font-bold text-primary-hijauTua">
                                            {selectedSample.method.reference}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Clock className="w-4 h-4" />
                                            <span>Durasi</span>
                                        </div>
                                        <Badge variant="info">
                                            {selectedSample.method.duration}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Calendar className="w-4 h-4" />
                                            <span>Masa Berlaku</span>
                                        </div>
                                        <Badge variant="success">
                                            {
                                                selectedSample.method
                                                    .validityPeriod
                                            }
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <Card className="border border-slate-200 shadow-xl bg-white">
                        <CardHeader className="border-b border-slate-100">
                            <CardTitle className="text-2xl font-bold text-primary-hijauTua flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                Tim Analis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 gap-4">
                                {detailOrder.analysts.map((analyst, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-2xl bg-teal-50 p-5 border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">
                                                    <User className="w-7 h-7 text-white" />
                                                </div>
                                                {analyst.verified && (
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-primary-hijauTua mb-1">
                                                    {analyst.name}
                                                </h4>
                                                <p className="text-sm text-primary-hijauTua/80 font-medium">
                                                    {analyst.role}
                                                </p>
                                            </div>
                                            <Settings className="w-5 h-5 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200 shadow-xl bg-white">
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center">
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
                                <p className="font-bold text-primary-hijauTua text-lg pl-6">
                                    {detailOrder.client}
                                </p>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                    <Microscope className="w-4 h-4" />
                                    <span>Metode Analisis</span>
                                </div>
                                <p className="font-bold text-primary-hijauTua pl-6">
                                    {detailOrder.metodeAnalisis}
                                </p>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                    <Package className="w-4 h-4" />
                                    <span>Tipe Order</span>
                                </div>
                                <Badge
                                    variant="error"
                                    className="capitalize ml-6"
                                >
                                    {detailOrder.orderType}
                                </Badge>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Laporan Terbit</span>
                                </div>
                                <p className="font-bold text-primary-hijauTua pl-6">
                                    {detailOrder.laporanTerbit}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200 shadow-2xl bg-primary-hijauTua text-white">
                        <CardHeader className="border-b border-white border-opacity-20 pb-4">
                            <CardTitle className="text-lg font-bold flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                                    <Pencil className="w-4 h-4" />
                                </div>
                                Catatan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                                <p className="text-sm leading-relaxed">
                                    {detailOrder.notes}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
