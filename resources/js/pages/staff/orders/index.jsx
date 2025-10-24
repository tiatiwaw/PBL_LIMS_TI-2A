import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { usePage } from "@inertiajs/react";
import StepperFirst from "@/components/shared/public/stepper-first";
import OrdersForm from "@/components/shared/form/orders-form1";
import OrdersForm2 from "@/components/shared/form/orders-form2";
import OrderForms3 from "@/components/shared/form/orders-form3";
import { CheckSquare } from "lucide-react";

export default function OrdersPage() {
  const { props } = usePage();
  const [step, setStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false); // Menandakan form sudah disimpan
  const user = props.auth?.user ?? { name: "Guest", role: "User" };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSave = () => {
    if (step === 3) {
      // Simulasi proses penyimpanan
      console.log("Data berhasil disimpan!");
      setIsSaved(true);
      // contoh: Inertia.post("/orders", formData);
    }
  };

  return (
    <DashboardLayout
      title="Orders"
      user={user}
      header="Registrasi Order Baru"
    >
      <div className="bg-white px-4 py-2 rounded-md shadow-sm">
        <StepperFirst currentStep={step} />
      </div>

      <div className="bg-white px-4 py-2 rounded-md shadow-sm">
        {/* Jika data sudah disimpan, tampilkan header sukses + detail order */}
        {isSaved ? (
          <>
            {/* ✅ Header sukses seperti di gambar */}
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-teal-800 flex items-center gap-2">
                REGISTRASI ORDER BERHASIL! <CheckSquare className="text-teal-600 w-7 h-7" />
              </h2>
              <p className="text-gray-700 text-sm mt-1">
                Order <strong>[Nomor Order]</strong> siap untuk diproses. Tim
                Manajer/Supervisor akan segera mereview dan menyetujuinya.
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
            {step === 1 && <OrdersForm />}
            {step === 2 && <OrdersForm2 />}
            {step === 3 && <OrderForms3 />}

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