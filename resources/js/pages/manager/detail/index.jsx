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
    Thermometer,
    Droplet,
    TestTube2,
    Gauge,
    ArrowDown,
    Pencil,
    MapPin,
    Phone,
    Mail,
    Award,
    GraduationCap,
    Barcode,
    FlaskConical,
    ShoppingCart,
    X,
} from "lucide-react";
import { detailOrder } from "@/data/manager/detail";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { router } from "@inertiajs/react";

export default function DetailOrder({ auth, canValidate }) {
    const [loading, setLoading] = useState(false);

    const handleValidate = () => {
        alert("Order berhasil divalidasi!");
        // setLoading(true);
        // router.post(`/manager/report-validation/${order.id}/validate`, {}, {
        //     onFinish: () => setLoading(false),
        //     onSuccess: () => alert("Order berhasil divalidasi!"),
        // });
    };

    const handleInvalidate = () => {
        alert("Order berhasil diinvalidasi!");
        // setLoading(true);
        // router.post(`/manager/report-validation/${order.id}/invalidate`, {}, {
        //     onFinish: () => setLoading(false),
        //     onSuccess: () => alert("Order berhasil diinvalidasi!"),
        // });
    };

    const [selectedSampleId, setSelectedSampleId] = useState(
        detailOrder.parameter_methods[0].id.toString()
    );

    const selectedSample = detailOrder.parameter_methods.find(
        (sample) => sample.id.toString() === selectedSampleId
    );

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };

    const getStatusLabel = (status) => {
        const statuses = {
            in_progress: "Sedang Diproses",
            completed: "Selesai",
            pending: "Menunggu"
        };
        return statuses[status] || status;
    };

    const getStatusParameterLabel = (status) => {
        const statuses = {
            success: "Berhasil",
            failed: "Gagal",
        };
        return statuses[status] || status;
    };

    const getEquipmentStatusLabel = (status) => {
        const statuses = {
            active: "Aktif",
            maintenance: "Perbaikan",
            broken: "Rusak",
        };
        return statuses[status] || status;
    };

    const getOrderTypeVariant = (type) => {
        const variants = {
            eksternal: "warning",
            internal: "info",
            urgent: "error",
        };
        return variants[type] || "default";
    };

    const getOrderStatusVariant = (type) => {
        const variants = {
            completed: "success",
            in_progress: "info",
            pending: "warning",
            disapproved: "error",
            approved: "approved",
            received: "received",
        };
        return variants[type] || "default";
    };

    const getSampleStatusVariant = (type) => {
        const variants = {
            failed: "error",
            success: "success",
        };
        return variants[type] || "default";
    };

    const getEquipmentStatusVariant = (type) => {
        const variants = {
            active: "success",
            maintenance: "warning",
            broken: "error",
        };
        return variants[type] || "default";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <DashboardLayout title="Users" user={currentUser} header="Users">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-start">
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="w-3/4 text-4xl font-bold text-primary-hijauTua">
                                {detailOrder.title}
                            </h1>
                            <div className="w-1/4 space-x-4 self-start mt-2">
                                <Badge variant={getOrderTypeVariant(detailOrder.order_type)} className="capitalize">
                                    {detailOrder.order_type}
                                </Badge>
                                <Badge variant={getOrderStatusVariant(detailOrder.status)}>
                                    {getStatusLabel(detailOrder.status)}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                                <ShoppingCart className="w-4 h-4 text-teal-600" />
                                <span>
                                    Order #{" "}
                                    <span className="font-semibold text-primary-hijauTua">
                                        {detailOrder.order_number}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Calendar className="w-4 h-4 text-teal-600" />
                                <span>
                                    Tanggal Order:{" "}
                                    <span className="font-semibold text-primary-hijauTua">
                                        {formatDate(detailOrder.order_date)}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Clock className="w-4 h-4 text-cyan-600" />
                                <span>
                                    Estimasi Selesai:{" "}
                                    <span className="font-semibold text-primary-hijauTua">
                                        {formatDate(detailOrder.estimated_date)}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-3 gap-y-10">
                        <div className="grid grid-cols-2 gap-3">
                            <Button className="flex items-center gap-2.5 py-2.5 bg-white text-primary-hijauTua font-semibold border border-primtext-primary-hijauTua rounded-lg shadow-sm hover:bg-primary-hijauTua hover:text-white transition-all">
                                <span>Download</span>
                                <ArrowDown className="w-5 h-5" />
                            </Button>
                            <Button className="flex items-center gap-2.5 py-2.5 bg-white text-primary-hijauTua font-semibold border border-primtext-primary-hijauTua rounded-lg shadow-sm hover:bg-primary-hijauTua hover:text-white transition-all">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Kembali</span>
                            </Button>
                        </div>
                        {canValidate && (
                            <div className="grid grid-cols-2 gap-3">
                                <Button onClick={handleValidate} className="flex items-center gap-2.5 py-2.5 bg-green-500 text-white font-semibold border border-white rounded-lg shadow-sm hover:bg-green-600 transition-all">
                                    <Check className="w-5 h-5" />
                                    <span>Setuju</span>
                                </Button>
                                <Button onClick={handleInvalidate} className="flex items-center gap-2.5 py-2.5 bg-red-500 text-white font-semibold border border-white rounded-lg shadow-sm hover:bg-red-700 transition-all">
                                    <X className="w-5 h-5" />
                                    <span>Tolak</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <Card className="border border-slate-200 shadow-xl bg-white">
                    <CardHeader className="bg-primary-hijauTua text-white rounded-t-2xl">
                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                                <Building2 className="w-5 h-5" />
                            </div>
                            Informasi Klien
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <Building2 className="w-4 h-4" />
                                    <span>Nama Perusahaan</span>
                                </div>
                                <p className="font-bold text-primary-hijauTua text-lg">
                                    {detailOrder.client.name}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <User className="w-4 h-4" />
                                    <span>Kontak Person</span>
                                </div>
                                <p className="font-semibold text-primary-hijauTua">
                                    {detailOrder.client.user.name}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <Mail className="w-4 h-4" />
                                    <span>Email</span>
                                </div>
                                <p className="font-semibold text-primary-hijauTua break-all">
                                    {detailOrder.client.user.email}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <Phone className="w-4 h-4" />
                                    <span>Telepon</span>
                                </div>
                                <p className="font-semibold text-primary-hijauTua">
                                    {detailOrder.client.phone_number}
                                </p>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    <span>Alamat</span>
                                </div>
                                <p className="font-semibold text-primary-hijauTua">
                                    {detailOrder.client.address}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <Barcode className="w-4 h-4" />
                                    <span>NPWP</span>
                                </div>
                                <p className="font-semibold text-primary-hijauTua">
                                    {detailOrder.client.npwp_number}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200 shadow-xl bg-white">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="text-2xl font-bold text-primary-hijauTua flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-hijauTua flex items-center justify-center">
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
                                {detailOrder.parameter_methods.map((sample) => (
                                    <SelectItem
                                        key={sample.id}
                                        value={sample.id.toString()}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-hijauTua flex items-center justify-center text-white font-semibold text-sm">
                                                {sample.id}
                                            </div>
                                            <span className="font-medium">
                                                {sample.name}
                                            </span>
                                            <Badge variant="success">
                                                {sample.sample_category.name}
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
                        <Card className="border border-slate-200 shadow-xl bg-white col-span-2">
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
                                            {selectedSample.name}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                <FileText className="w-4 h-4" />
                                                <span>Kategori</span>
                                            </div>
                                            <Badge variant="success">
                                                {selectedSample.sample_category.name}
                                            </Badge>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                <Beaker className="w-4 h-4" />
                                                <span>Bentuk</span>
                                            </div>
                                            <p className="font-bold text-primary-hijauTua">
                                                {selectedSample.form}
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
                                                    {selectedSample.condition}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                <TestTube className="w-4 h-4" />
                                                <span>Status</span>
                                            </div>
                                            <Badge variant={getSampleStatusVariant(selectedSample.status)}>
                                                {getStatusParameterLabel(selectedSample.status)}
                                            </Badge>
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
                                            {selectedSample.preservation_method}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                                        <Thermometer className="w-4 h-4" />
                                        <span>Kondisi Penyimpanan</span>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                        <p className="text-primary-hijauTua font-medium">
                                            {selectedSample.storage_condition}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2 col-span-2">
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
                                            {selectedSample.parameter.detectionLimit}
                                        </p>
                                    </div>

                                    <div className="space-y-2 col-span-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Gauge className="w-4 h-4" />
                                            <span>Standar Kualitas</span>
                                        </div>
                                        <p className="font-bold text-primary-hijauTua">
                                            {selectedSample.parameter.quality_standard}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Link2 className="w-4 h-4" />
                                            <span>Referensi</span>
                                        </div>
                                        <p className="font-bold text-primary-hijauTua">
                                            {selectedSample.parameter.reference.name}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Droplet className="w-4 h-4" />
                                            <span>Satuan</span>
                                        </div>
                                        <Badge variant="info">
                                            {selectedSample.parameter.unit.value}
                                        </Badge>
                                    </div>
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
                                <div className="space-y-2 col-span-2">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <FileText className="w-4 h-4" />
                                        <span>Nama Metode</span>
                                    </div>
                                    <p className="font-bold text-primary-hijauTua text-lg">
                                        {selectedSample.method.name}
                                    </p>
                                </div>

                                <div className="space-y-2 col-span-2">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <Link2 className="w-4 h-4" />
                                        <span>Referensi</span>
                                    </div>
                                    <p className="font-bold text-primary-hijauTua">
                                        {selectedSample.method.reference.name}
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
                                        {selectedSample.method.validity_period}
                                    </Badge>
                                </div>

                                <div className="space-y-2 col-span-2">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <TestTube className="w-4 h-4" />
                                        <span>Parameter Terkait</span>
                                    </div>
                                    <p className="font-bold text-primary-hijauTua">
                                        {selectedSample.method.applicable_parameter}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {selectedSample && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border border-slate-200 shadow-xl bg-white">
                            <CardHeader className="border-b border-slate-100">
                                <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                                        <Settings className="w-5 h-5 text-white" />
                                    </div>
                                    Peralatan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {selectedSample.equipements.map((equipment, index) => (
                                    <div
                                        key={index}
                                        className="bg-primary-hijauTerang rounded-xl p-4 border border-slate-200"
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Nama Alat</p>
                                                <p className="font-bold text-primary-hijauTua">{equipment.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Serial Number</p>
                                                <p className="font-semibold text-primary-hijauTua">{equipment.serial_number}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Tipe</p>
                                                <Badge variant="received">
                                                    {equipment.brand_type.name}
                                                </Badge>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Status</p>
                                                <Badge variant={getEquipmentStatusVariant(equipment.status)} className="capitalize">
                                                    {getEquipmentStatusLabel(equipment.status)}
                                                </Badge>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Tahun Beli</p>
                                                <p className="font-semibold text-primary-hijauTua">{equipment.purchase_year}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Lokasi</p>
                                                <p className="font-semibold text-primary-hijauTua">{equipment.location}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-xs text-slate-500 mb-1">Jadwal Kalibrasi</p>
                                                <p className="font-semibold text-primary-hijauTua">
                                                    {formatDate(equipment.calibration_schedule)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border border-slate-200 shadow-xl bg-white">
                            <CardHeader className="border-b border-slate-100">
                                <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                                        <FlaskConical className="w-5 h-5 text-white" />
                                    </div>
                                    Reagen
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {selectedSample.reagents.map((reagent, index) => (
                                    <div
                                        key={index}
                                        className="bg-primary-hijauTerang rounded-xl p-4 border border-slate-200"
                                    >
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <p className="text-xs text-slate-500 mb-1">Nama Reagen</p>
                                                    <p className="font-bold text-primary-hijauTua">{reagent.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 mb-1">Formula</p>
                                                    <p className="font-semibold text-primary-hijauTua">{reagent.formula}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 mb-1">Grade</p>
                                                    <Badge className="bg-amber-100/70 border border-amber-500 text-amber-800 hover:bg-amber-100">
                                                        Grade {reagent.grade.name}
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 mb-1">Batch Number</p>
                                                    <p className="font-semibold text-primary-hijauTua">{reagent.batch_number}</p>
                                                </div>
                                            </div>
                                            <div className="pt-2 border-t border-slate-200">
                                                <p className="text-xs text-slate-500 mb-1">Lokasi Penyimpanan</p>
                                                <p className="font-semibold text-primary-hijauTua">{reagent.storage_location}</p>
                                            </div>
                                            <div className="pt-2 border-t border-slate-200">
                                                <p className="text-xs text-slate-500 mb-2">Supplier</p>
                                                <div className="bg-white rounded-lg p-3 space-y-2">
                                                    <p className="font-bold text-primary-hijauTua">{reagent.supplier.name}</p>
                                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                                        <div>
                                                            <p className="text-xs text-slate-500">Kontak</p>
                                                            <p className="font-semibold text-primary-hijauTua">
                                                                {reagent.supplier.contact_person}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-slate-500">Telepon</p>
                                                            <p className="font-semibold text-primary-hijauTua">
                                                                {reagent.supplier.phone_number}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Alamat</p>
                                                        <p className="text-sm text-slate-600">
                                                            {reagent.supplier.address}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <Card className="border border-slate-200 shadow-xl bg-white">
                        <CardHeader className="border-b border-slate-100">
                            <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                Tim Analis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {detailOrder.analysts.map((analyst, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 p-5 border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">
                                                        <User className="w-7 h-7 text-white" />
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-primary-hijauTua mb-1">
                                                        {analyst.user.name}
                                                    </h4>
                                                    <p className="text-sm text-slate-600 font-medium">
                                                        {analyst.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        {analyst.user.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2 pt-3 border-t border-slate-200">
                                                <div>
                                                    <p className="text-xs text-slate-500 mb-1">Spesialisasi</p>
                                                    <Badge variant="received">
                                                        {analyst.specialist}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {analyst.certificates.length > 0 && (
                                                <div className="pt-2">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Award className="w-4 h-4 text-teal-600" />
                                                        <p className="text-xs text-slate-500 font-semibold">Sertifikasi</p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {analyst.certificates.map((cert, idx) => (
                                                            <Badge key={idx} variant="success">
                                                                {cert.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {analyst.trainings.length > 0 && (
                                                <div className="pt-2">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <GraduationCap className="w-4 h-4 text-teal-600" />
                                                        <p className="text-xs text-slate-500 font-semibold">Pelatihan</p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {analyst.trainings.map((training, idx) => (
                                                            <Badge key={idx} variant="info">
                                                                {training.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200 shadow-xl bg-white">
                        <CardHeader className="border-b border-slate-100">
                            <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                                    <Microscope className="w-5 h-5 text-white" />
                                </div>
                                Metode Analisis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-5">
                            {detailOrder.analysis_methods.map((method, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-slate-200"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-500 mb-2">Nama Metode</p>
                                            <p className="font-bold text-primary-hijauTua text-lg">
                                                {method.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-slate-200">
                                        <p className="text-xs text-slate-500 mb-1">Harga</p>
                                        <p className="font-bold text-primary-hijauTua text-xl">
                                            Rp {parseInt(method.price).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4"></div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Laporan Terbit</p>
                                    <p className="font-bold text-primary-hijauTua">
                                        {formatDate(detailOrder.report_issued_at)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Lokasi File</p>
                                    <p className="font-semibold text-slate-600 text-sm">
                                        {detailOrder.report_file_path}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 mb-2">Hasil Nilai</p>
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                        <p className="text-sm text-green-800 font-medium">
                                            {detailOrder.result_value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className=" shadow-2xl bg-primary-hijauTua text-white">
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-bold flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                                    <Pencil className="w-4 h-4" />
                                </div>
                                Catatan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-30">
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