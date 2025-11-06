import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useForm, router } from "@inertiajs/react";
import StepperFirst from "@/components/shared/staff/stepper-first";
import OrdersForm from "@/components/shared/staff/orders-form1";
import OrdersForm2 from "@/components/shared/staff/orders-form2";
import OrderForms3 from "@/components/shared/staff/orders-form3";
import { CheckSquare } from "lucide-react";

export default function OrdersPage({
    auth,
    clients,
    methods,
    samples,
    categories,
    orderNumber,
}) {
    const [step, setStep] = useState(1);
    const [isSaved, setIsSaved] = useState(false); // Menandakan form sudah disimpan
    const currentUser = auth?.user || { name: "King Akbar", role: "Staff" };

    const { data, setData, post, processing, errors, reset } = useForm({
        // Step 1 data
        selectedKlien: null,
        judulOrder: "",
        metodeAnalisis: [],
        nomorOrder: orderNumber,

        // Step 2 data
        tipeOrder: "",
        samples: [],
        tanggalOrder: new Date()
            .toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" })
            .split("T")[0],
        estimasiSelesai: null,
        catatan: "",
        totalHarga: null,
    });

    // 1. Buat ref yang akan kita pasang ke kontainer form
    const formTopRef = useRef(null);

    // 2. Buat useEffect yang akan berjalan setiap kali 'step' berubah
    useEffect(() => {
        // Cek jika ref sudah terpasang
        if (formTopRef.current) {
            // Perintahkan browser untuk scroll ke elemen tersebut
            formTopRef.current.scrollIntoView({
                behavior: "smooth", // Agar scroll-nya halus
                block: "start", // Sejajarkan ke bagian atas
            });
        }
    }, [step]); // <-- 'Dependencies': jalankan HANYA saat 'step' berubah

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        setStep((prev) => prev - 1);
    };

    const handleSave = () => {
        if (step === 3) {
            post(route("staff.order.store"), {
                onSuccess: () => {
                    console.log("Data berhasil disimpan!");
                    setIsSaved(true);
                },
                onError: (e) => {
                    console.error("Gagal menyimpan data:", e);
                    // toast.error(
                    //     "Gagal menyimpan data. Periksa kembali form Anda."
                    // );
                    if (
                        errors.selectedKlien ||
                        errors.judulOrder ||
                        errors.metodeAnalisis
                    ) {
                        setStep(1);
                    } else if (errors.samples || errors.tipeOrder) {
                        setStep(2);
                    }
                },
            });
        }
    };

    return (
        <DashboardLayout
            title="Orders"
            user={currentUser}
            header="Registrasi Order Baru"
        >
            <div ref={formTopRef} className="px-4 py-2 rounded-md shadow-sm">
                <StepperFirst currentStep={step} />
            </div>

            <div className="px-4 py-2 rounded-md shadow-sm">
                {/* Jika data sudah disimpan, tampilkan header sukses + detail order */}
                {isSaved ? (
                    <>
                        {/* ✅ Header sukses seperti di gambar */}
                        <div ref={formTopRef} className="p-6">
                            <h2 className="text-2xl font-extrabold text-teal-800 flex items-center gap-2">
                                REGISTRASI ORDER BERHASIL!{" "}
                                <CheckSquare className="text-teal-600 w-7 h-7" />
                            </h2>
                            <p className="text-gray-700 text-sm mt-1">
                                Order <strong>{data.nomorOrder}</strong> siap
                                untuk diproses. Tim Supervisor akan segera
                                mereview dan menyetujuinya.
                            </p>
                        </div>

                        {/* ✅ Komponen order summary (OrderForms3) */}
                        <OrderForms3 data={data} />

                        {/* Tombol kembali ke form */}
                        <div className="flex justify-end mt-8">
                            <button
                                onClick={() => {
                                    setIsSaved(false);
                                    router.visit(route("staff.order.index"));
                                }}
                                className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                Kembali
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Tahapan form */}
                        {step === 1 && (
                            <OrdersForm
                                clients={clients}
                                methods={methods}
                                data={data}
                                setData={setData}
                            />
                        )}
                        {step === 2 && (
                            <OrdersForm2
                                samples={samples}
                                categories={categories}
                                data={data}
                                setData={setData}
                            />
                        )}
                        {step === 3 && <OrderForms3 data={data} />}

                        {/* Tombol navigasi */}
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={handlePrev}
                                disabled={step === 1}
                                className="px-8 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                                Kembali
                            </button>

                            {step < 3 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Lanjutkan
                                </button>
                            ) : (
                                <button
                                    onClick={handleSave}
                                    disabled={
                                        processing ||
                                        !data.selectedKlien ||
                                        !data.judulOrder.trim() ||
                                        data.metodeAnalisis.length === 0 ||
                                        !data.tipeOrder ||
                                        data.samples.length === 0 ||
                                        data.metodeAnalisis.some(
                                            (m) => !m.description?.trim()
                                        ) ||
                                        data.samples.some(
                                            (s) => !s.sample_volume?.trim()
                                        )
                                    }
                                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}