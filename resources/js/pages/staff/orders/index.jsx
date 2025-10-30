import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { usePage, Inertia } from "@inertiajs/react";
import StepperFirst from "@/components/shared/staff/stepper-first";
import OrdersForm from "@/components/shared/staff/orders-form1";
import OrdersForm2 from "@/components/shared/staff/orders-form2";
import OrderForms3 from "@/components/shared/staff/orders-form3";
import { CheckSquare } from "lucide-react";

export default function OrdersPage({ auth }) {
    const [formData, setFormData] = useState({
  selectedKlien: null,
  judulOrder: "",
  metodeAnalisis: "",
  nomorOrder: "",
  tipeOrder: "",
  samples: [],
  tanggalOrder: "",
  estimasiSelesai: "",
  catatan: "",
});
    //const { props } = usePage();
    const [step, setStep] = useState(1);
    const [isSaved, setIsSaved] = useState(false); // Menandakan form sudah disimpan
    const currentUser = auth?.user || { name: "King Akbar", role: "Staff" };

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        setStep((prev) => prev - 1);
    };

    // const handleSave = () => {
    //     if (step === 3) {
    //         // Simulasi proses penyimpanan
    //         console.log("Data berhasil disimpan!");
    //         setIsSaved(true);
    //         // contoh: Inertia.post("/orders", formData);
    //     }
    // };
    const handleSave = () => {
      Inertia.post(route("staff.orders.store"), formData, {
        onSuccess: () => setIsSaved(true),
      });
    };


    const { samples, methods, clients } = usePage().props;

    return (
        <DashboardLayout
            title="Orders"
            user={currentUser}
            header="Registrasi Order Baru"
        >
            <div className="px-4 py-2 rounded-md shadow-sm">
                <StepperFirst currentStep={step} />
            </div>

            <div className="px-4 py-2 rounded-md shadow-sm">
                {/* Jika data sudah disimpan, tampilkan header sukses + detail order */}
                {isSaved ? (
                    <>
                        {/* ✅ Header sukses seperti di gambar */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-extrabold text-teal-800 flex items-center gap-2">
                                REGISTRASI ORDER BERHASIL!{" "}
                                <CheckSquare className="text-teal-600 w-7 h-7" />
                            </h2>
                            <p className="text-gray-700 text-sm mt-1">
                                Order <strong>[Nomor Order]</strong> siap untuk
                                diproses. Tim Manajer/Supervisor akan segera
                                mereview dan menyetujuinya.
                            </p>
                        </div>

                        {/* ✅ Komponen order summary (OrderForms3) */}
                        <OrderForms3 />

                        {/* Tombol kembali ke form */}
                        <div className="flex justify-end mt-8">
                            <button
                                onClick={() => {
                                    setIsSaved(false);
                                    setStep(1);
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
                        {/* {step === 1 && <OrdersForm />}
                        {step === 2 && <OrdersForm2 />}
                        {step === 3 && <OrderForms3 />} */}
                        {step === 1 && (
                          <OrdersForm
                            clients={clients}
                            methods={methods}
                            formData={formData}
                            setFormData={setFormData}
                          />
                        )}
                        {step === 2 && (
                          <OrdersForm2
                            samples={samples}
                            formData={formData}
                            setFormData={setFormData}
                          />
                        )}
                        {step === 3 && <OrderForms3 formData={formData} />}

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
                                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Simpan
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
