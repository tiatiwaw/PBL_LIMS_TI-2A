import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Award,
    FileText,
    Upload,
    ShieldCheck,
    User,
    Mail,
    MapPin,
    Phone,
    Lock,
    Edit3,
    ChevronLeft,
    Eye,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import {
    getProfile,
    useChangePassword,
    useUpdateProfile,
    useUploadSignature,
    useUpdateEmail,
    useUpdatePhone,
} from "@/hooks/useProfile";
import SignaturePad from "@/components/profile/signature-pad";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
};

export default function ProfilePage() {
    const { user } = useAuth();
    const { data: profileData, isLoading, error } = getProfile(user?.id);
    const updateProfile = useUpdateProfile();
    const uploadSignature = useUploadSignature();
    const changePassword = useChangePassword();
    const updateEmail = useUpdateEmail();
    const updatePhone = useUpdatePhone();

    const [modals, setModals] = useState({
        editName: false,
        editEmail: false,
        editPhone: false,
        signature: false,
        password: false,
        pdfPreview: null,
        signaturePreview: false,
    });

    const [forms, setForms] = useState({
        name: "",
        email: "",
        emailPassword: "",
        phone: "",
        oldPassword: "",
        newPassword: "",
        signatureFile: null,
    });

    if (isLoading) {
        return (
            <DashboardLayout title="Profile" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Profile" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    const toggleModal = (key, value) =>
        setModals((prev) => ({ ...prev, [key]: value }));
    const updateForm = (key, value) =>
        setForms((prev) => ({ ...prev, [key]: value }));

    const handleSaveName = async () => {
        try {
            await updateProfile.mutateAsync({
                id: profileData.id,
                data: { name: forms.name },
            });
            toast.success("Profil berhasil diperbarui");
            toggleModal("editName", false);
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Gagal memperbarui nama"
            );
        }
    };

    const handleSaveEmail = async () => {
        if (!forms.email || !forms.emailPassword) {
            toast.error("Email dan password harus diisi");
            return;
        }
        try {
            await updateEmail.mutateAsync({
                id: profileData.id,
                data: { email: forms.email, password: forms.emailPassword },
            });
            toast.success("Email berhasil diperbarui");
            toggleModal("editEmail", false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Gagal memperbarui email");
        }
    };

    const handleSavePhone = async () => {
        if (!forms.phone) {
            toast.error("Nomor telepon harus diisi");
            return;
        }
        try {
            await updatePhone.mutateAsync({
                id: profileData.id,
                data: { phone_number: forms.phone },
            });
            toast.success("Nomor telepon berhasil diperbarui");
            toggleModal("editPhone", false);
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Gagal memperbarui nomor telepon"
            );
        }
    };

    const handleSignatureSubmit = async (fileData) => {
        try {
            const file =
                fileData instanceof Blob
                    ? new File([fileData], `sig-${Date.now()}.png`, {
                          type: "image/png",
                      })
                    : forms.signatureFile;

            await uploadSignature.mutateAsync({
                id: profileData.id,
                signature: file,
            });
            toast.success("Tanda tangan tersimpan");
            toggleModal("signature", false);
        } catch (err) {
            toast.error("Gagal mengunggah tanda tangan");
        }
    };

    return (
        <DashboardLayout title="Profil Saya" header="Profil Saya">
            <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="max-w-5xl mx-auto space-y-6 pb-10 px-4"
            >
                <motion.div variants={fadeInUp} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-hijauTua to-primary-hijauGelap rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-white rounded-2xl p-8 border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                        <div className="flex items-center gap-6">
                            <div className="h-20 w-20 rounded-2xl bg-primary-hijauTua text-white flex items-center justify-center shadow-lg shadow-primary-hijauTua/20">
                                <User size={36} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold text-primary-hijauGelap">
                                        {profileData?.name}
                                    </h1>
                                    <Badge className="bg-primary-hijauTua text-white border-none hover:bg-primary-hijauGelap transition-colors uppercase text-[10px]">
                                        {profileData?.role}
                                    </Badge>
                                </div>
                                <p className="text-slate-500 flex items-center gap-2 mt-1 text-sm">
                                    <Mail
                                        size={14}
                                        className="text-primary-hijauTua"
                                    />{" "}
                                    {profileData?.email}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="rounded-xl border-primary-hijauTua/20 text-primary-hijauTua hover:bg-primary-hijauTua hover:text-white transition-all"
                        >
                            <ChevronLeft className="mr-2 w-4 h-4" /> Kembali
                        </Button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        variants={fadeInUp}
                        className="md:col-span-2 space-y-6"
                    >
                        <Card className="border-none shadow-sm overflow-hidden ring-1 ring-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-50">
                                <div>
                                    <CardTitle className="text-lg text-primary-hijauGelap">
                                        Informasi Personal
                                    </CardTitle>
                                    <CardDescription>
                                        Detail akun dan data diri Anda
                                    </CardDescription>
                                </div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-primary-hijauTua hover:bg-primary-hijauTerang"
                                    onClick={() => {
                                        updateForm("name", profileData?.name);
                                        toggleModal("editName", true);
                                    }}
                                >
                                    <Edit3 className="w-4 h-4 mr-2" /> Edit
                                </Button>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 py-6">
                                <InfoItem
                                    icon={<User />}
                                    label="Nama Lengkap"
                                    value={profileData?.name}
                                />
                                <InfoItem
                                    icon={<Mail />}
                                    label="Email"
                                    value={profileData?.email}
                                />
                                {profileData?.role === "analyst" && (
                                    <InfoItem
                                        icon={<ShieldCheck />}
                                        label="Spesialisasi"
                                        value={profileData?.analyst?.specialist}
                                    />
                                )}
                                {profileData?.role === "client" && (
                                    <>
                                        <InfoItem
                                            icon={<MapPin />}
                                            label="Alamat"
                                            value={
                                                profileData?.clients?.address
                                            }
                                        />
                                        <InfoItem
                                            icon={<Phone />}
                                            label="No. Hp"
                                            value={
                                                profileData?.clients
                                                    ?.phone_number
                                            }
                                        />
                                    </>
                                )}
                            </CardContent>
                            <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    className="border-primary-hijauTua/20 text-primary-hijauTua hover:bg-primary-hijauTerang"
                                    onClick={() =>
                                        toggleModal("password", true)
                                    }
                                >
                                    <Lock className="w-4 h-4 mr-2" /> Ganti
                                    Password
                                </Button>
                            </div>
                        </Card>

                        {profileData?.role === "analyst" && (
                            <div className="space-y-6">
                                <ProfessionalCard
                                    title="Sertifikat"
                                    icon={
                                        <Award className="text-primary-hijauTua" />
                                    }
                                    items={profileData?.analyst?.certificates}
                                    type="certificate"
                                    onPreview={(path) =>
                                        toggleModal("pdfPreview", path)
                                    }
                                />
                                <ProfessionalCard
                                    title="Training"
                                    icon={
                                        <FileText className="text-primary-hijauTua" />
                                    }
                                    items={profileData?.analyst?.trainings}
                                    type="training"
                                />
                            </div>
                        )}
                    </motion.div>

                    <motion.div variants={fadeInUp} className="md:col-span-1">
                        {profileData?.role !== "client" && (
                            <Card className="border-none shadow-sm ring-1 ring-slate-200 sticky top-6 overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2 text-primary-hijauGelap">
                                        <Edit3 className="w-4 h-4 text-primary-hijauTua" />{" "}
                                        Tanda Tangan
                                    </CardTitle>
                                    <CardDescription>
                                        Pratinjau tanda tangan digital Anda
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {profileData?.signature ? (
                                        <div
                                            className="group relative border-2 border-dashed border-primary-hijauTua/20 rounded-xl p-4 bg-primary-hijauTerang/30 hover:border-primary-hijauTua/40 hover:bg-primary-hijauTerang transition-all cursor-pointer"
                                            onClick={() =>
                                                toggleModal(
                                                    "signaturePreview",
                                                    true
                                                )
                                            }
                                        >
                                            <img
                                                src={`/storage/${profileData.signature.replace(
                                                    /\\/g,
                                                    "/"
                                                )}`}
                                                alt="signature"
                                                className="w-full h-32 object-contain filter hover:brightness-95"
                                            />
                                            <div className="absolute inset-0 bg-primary-hijauTua/5 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
                                                <Eye className="text-primary-hijauTua" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-32 border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                                            <Upload className="mb-2 opacity-30" />
                                            <span className="text-xs">
                                                Belum ada tanda tangan
                                            </span>
                                        </div>
                                    )}
                                    <Button
                                        className="w-full bg-primary-hijauTua hover:bg-primary-hijauGelap text-white shadow-md transition-all active:scale-95"
                                        onClick={() =>
                                            toggleModal("signature", true)
                                        }
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        {profileData?.signature
                                            ? "Ubah"
                                            : "Upload"}{" "}
                                        Tanda Tangan
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>
                </div>

                <Dialog
                    open={modals.editName}
                    onOpenChange={(val) => toggleModal("editName", val)}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-primary-hijauTua">
                                Edit Nama
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    value={forms.name}
                                    onChange={(e) =>
                                        updateForm("name", e.target.value)
                                    }
                                    className="focus-visible:ring-primary-hijauTua"
                                />
                            </div>
                        </div>
                        {profileData?.role === "client" && (
                            <div className="border-t pt-4">
                                <p className="text-sm font-semibold text-slate-700 mb-3">
                                    Ubah Data Lain
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-primary-hijauTua/20 text-primary-hijauTua hover:bg-primary-hijauTerang"
                                        onClick={() => {
                                            updateForm("email", profileData?.email);
                                            updateForm("emailPassword", "");
                                            toggleModal("editName", false);
                                            toggleModal("editEmail", true);
                                        }}
                                    >
                                        <Mail className="w-4 h-4 mr-2" /> Ubah
                                        Email
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-primary-hijauTua/20 text-primary-hijauTua hover:bg-primary-hijauTerang"
                                        onClick={() => {
                                            updateForm(
                                                "phone",
                                                profileData?.clients
                                                    ?.phone_number
                                            );
                                            toggleModal("editName", false);
                                            toggleModal("editPhone", true);
                                        }}
                                    >
                                        <Phone className="w-4 h-4 mr-2" /> Ubah
                                        No. HP
                                    </Button>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => toggleModal("editName", false)}
                            >
                                Batal
                            </Button>
                            <Button
                                className="bg-primary-hijauTua hover:bg-primary-hijauGelap"
                                onClick={handleSaveName}
                                disabled={updateProfile.isPending}
                            >
                                {updateProfile.isPending
                                    ? "Menyimpan..."
                                    : "Simpan"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={modals.password}
                    onOpenChange={(val) => toggleModal("password", val)}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-primary-hijauTua">
                                Ganti Password
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Password Lama</Label>
                                <Input
                                    type="password"
                                    value={forms.oldPassword}
                                    onChange={(e) =>
                                        updateForm(
                                            "oldPassword",
                                            e.target.value
                                        )
                                    }
                                    className="focus-visible:ring-primary-hijauTua"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Password Baru</Label>
                                <Input
                                    type="password"
                                    value={forms.newPassword}
                                    onChange={(e) =>
                                        updateForm(
                                            "newPassword",
                                            e.target.value
                                        )
                                    }
                                    className="focus-visible:ring-primary-hijauTua"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => toggleModal("password", false)}
                            >
                                Batal
                            </Button>
                            <Button
                                className="bg-primary-hijauTua hover:bg-primary-hijauGelap"
                                onClick={() =>
                                    changePassword.mutate({
                                        id: profileData.id,
                                        data: {
                                            old_password: forms.oldPassword,
                                            new_password: forms.newPassword,
                                        },
                                    })
                                }
                                disabled={changePassword.isPending}
                            >
                                Perbarui Password
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={modals.editEmail}
                    onOpenChange={(val) => toggleModal("editEmail", val)}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-primary-hijauTua">
                                Ubah Email
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Baru</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={forms.email}
                                    onChange={(e) =>
                                        updateForm("email", e.target.value)
                                    }
                                    className="focus-visible:ring-primary-hijauTua"
                                    placeholder="Masukkan email baru"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="emailPassword">Password</Label>
                                <Input
                                    id="emailPassword"
                                    type="password"
                                    value={forms.emailPassword}
                                    onChange={(e) =>
                                        updateForm("emailPassword", e.target.value)
                                    }
                                    className="focus-visible:ring-primary-hijauTua"
                                    placeholder="Masukkan password untuk konfirmasi"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => toggleModal("editEmail", false)}
                            >
                                Batal
                            </Button>
                            <Button
                                className="bg-primary-hijauTua hover:bg-primary-hijauGelap"
                                onClick={handleSaveEmail}
                                disabled={updateEmail.isPending}
                            >
                                {updateEmail.isPending
                                    ? "Menyimpan..."
                                    : "Simpan"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={modals.editPhone}
                    onOpenChange={(val) => toggleModal("editPhone", val)}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-primary-hijauTua">
                                Ubah Nomor Telepon
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Nomor Telepon</Label>
                                <Input
                                    id="phone"
                                    value={forms.phone}
                                    onChange={(e) =>
                                        updateForm("phone", e.target.value)
                                    }
                                    className="focus-visible:ring-primary-hijauTua"
                                    placeholder="Masukkan nomor telepon"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => toggleModal("editPhone", false)}
                            >
                                Batal
                            </Button>
                            <Button
                                className="bg-primary-hijauTua hover:bg-primary-hijauGelap"
                                onClick={handleSavePhone}
                                disabled={updatePhone.isPending}
                            >
                                {updatePhone.isPending
                                    ? "Menyimpan..."
                                    : "Simpan"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={modals.signature}
                    onOpenChange={(val) => toggleModal("signature", val)}
                >
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-primary-hijauTua text-center">
                                Metode Tanda Tangan
                            </DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="upload" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1">
                                <TabsTrigger
                                    value="upload"
                                    className="data-[state=active]:bg-primary-hijauTua data-[state=active]:text-white"
                                >
                                    Upload File
                                </TabsTrigger>
                                <TabsTrigger
                                    value="draw"
                                    className="data-[state=active]:bg-primary-hijauTua data-[state=active]:text-white"
                                >
                                    Gambar
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="upload"
                                className="space-y-4 pt-4"
                            >
                                <div className="border-2 border-dashed border-primary-hijauTua/20 rounded-xl p-8 text-center bg-slate-50/50">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="sig-file"
                                        onChange={(e) =>
                                            updateForm(
                                                "signatureFile",
                                                e.target.files?.[0]
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor="sig-file"
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-primary-hijauTua text-white shadow-md flex items-center justify-center mb-2">
                                            <Upload className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-medium text-primary-hijauTua">
                                            {forms.signatureFile?.name ||
                                                "Klik untuk pilih gambar"}
                                        </span>
                                    </Label>
                                </div>
                                <Button
                                    className="w-full bg-primary-hijauTua hover:bg-primary-hijauGelap"
                                    disabled={
                                        !forms.signatureFile ||
                                        uploadSignature.isPending
                                    }
                                    onClick={handleSignatureSubmit}
                                >
                                    Upload
                                </Button>
                            </TabsContent>
                            <TabsContent value="draw" className="pt-4">
                                <SignaturePad
                                    onSave={handleSignatureSubmit}
                                    onCancel={() =>
                                        toggleModal("signature", false)
                                    }
                                />
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>

                <AnimatePresence>
                    {modals.pdfPreview && (
                        <ModalPortal
                            onClose={() => toggleModal("pdfPreview", null)}
                            title="Pratinjau Dokumen"
                        >
                            <iframe
                                src={`/${modals.pdfPreview}`}
                                className="w-full h-full rounded-lg"
                            />
                        </ModalPortal>
                    )}
                    {modals.signaturePreview && (
                        <ModalPortal
                            title="Pratinjau Tanda Tangan"
                            onClose={() =>
                                toggleModal("signaturePreview", false)
                            }
                        >
                            <div className="bg-slate-50 p-8 rounded-xl flex items-center justify-center border border-slate-100 h-full">
                                <img
                                    src={`/storage/${profileData.signature.replace(
                                        /\\/g,
                                        "/"
                                    )}`}
                                    alt="Signature Preview"
                                    className="max-h-full object-contain"
                                />
                            </div>
                        </ModalPortal>
                    )}
                </AnimatePresence>
            </motion.div>
        </DashboardLayout>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4">
            <div className="mt-1 p-2 rounded-lg bg-primary-hijauTerang text-primary-hijauTua">
                {React.cloneElement(icon, { size: 16 })}
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {label}
                </p>
                <p className="text-primary-hijauGelap font-semibold text-sm">
                    {value || "-"}
                </p>
            </div>
        </div>
    );
}

function ProfessionalCard({ title, icon, items, type, onPreview }) {
    return (
        <Card className="border-none shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <CardHeader className="bg-slate-50/50 py-3 border-b border-slate-100">
                <CardTitle className="text-sm flex items-center gap-2 text-primary-hijauTua font-bold">
                    {icon} {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                {items?.length > 0 ? (
                    <div
                        className={
                            type === "certificate"
                                ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
                                : "space-y-3"
                        }
                    >
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() =>
                                    item.file_path &&
                                    onPreview?.(item.file_path)
                                }
                                className={`p-3 rounded-xl border border-slate-100 transition-all ${
                                    item.file_path
                                        ? "hover:border-primary-hijauTua hover:bg-primary-hijauTerang cursor-pointer"
                                        : "bg-slate-50/50"
                                }`}
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <div className="overflow-hidden">
                                        <h4 className="font-bold text-primary-hijauTua text-xs truncate">
                                            {item.name}
                                        </h4>
                                        <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                                            {item.provider || item.date}
                                        </p>
                                        {item.result && (
                                            <Badge className="mt-2 bg-primary-hijauTua text-white border-none text-[9px] h-5">
                                                {item.result}
                                            </Badge>
                                        )}
                                    </div>
                                    {item.file_path && (
                                        <Eye className="w-3 h-3 text-primary-hijauTua shrink-0" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 text-slate-400 text-xs italic">
                        Data belum tersedia
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function ModalPortal({ children, onClose, title }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-hijauGelap/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-4xl h-[75vh] flex flex-col relative shadow-2xl overflow-hidden"
            >
                <div className="p-4 border-b flex justify-between items-center bg-primary-hijauTua text-white">
                    <h3 className="font-bold text-sm">{title}</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="rounded-full h-8 w-8 text-white hover:bg-white/20"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex-1 p-4 bg-slate-50/30">{children}</div>
            </motion.div>
        </motion.div>
    );
}

function EditEmailModal({ email, setEmail, password, setPassword, onSave, onClose, isLoading }) {
  return (
    <BaseModal title="Ubah Email" onClose={onClose}>
      <div className="mb-4">
        <label className="block text-sm mb-2 font-medium text-slate-700">Email Baru</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary-hijauMuda outline-none"
          placeholder="Masukkan email baru"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2 font-medium text-slate-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary-hijauMuda outline-none"
          placeholder="Masukkan password untuk konfirmasi"
        />
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onClose} className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-100">
          Batal
        </button>
        <button
          onClick={onSave}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-primary-hijauMuda text-white shadow hover:scale-105 transition disabled:opacity-50"
        >
          {isLoading ? "Menyimpan" : "Simpan"}
        </button>
      </div>
    </BaseModal>
  );
}

function EditPhoneModal({ phone, setPhone, onSave, onClose, isLoading }) {
  return (
    <BaseModal title="Ubah Nomor Telepon" onClose={onClose}>
      <div className="mb-4">
        <label className="block text-sm mb-2 font-medium text-slate-700">Nomor Telepon</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary-hijauMuda outline-none"
          placeholder="Masukkan nomor telepon"
        />
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onClose} className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-100">
          Batal
        </button>
        <button
          onClick={onSave}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-primary-hijauMuda text-white shadow hover:scale-105 transition disabled:opacity-50"
        >
          {isLoading ? "Menyimpan" : "Simpan"}
        </button>
      </div>
    </BaseModal>
  );
}
