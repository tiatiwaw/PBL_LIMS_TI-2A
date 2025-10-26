import React from "react";
import { CheckSquare } from "lucide-react";

export default function SuccessMessage({ orderNumber }) {
  return (
    <div className="bg-teal-50 border border-teal-300 rounded-xl p-6 mt-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-teal-800 flex items-center gap-2">
        REGISTRASI ORDER BERHASIL! <CheckSquare className="text-teal-600 w-6 h-6" />
      </h2>
      <p className="text-gray-700 mt-2 text-sm">
        Order <strong>{orderNumber ? orderNumber : "[Nomor Order]"}</strong> siap untuk diproses.
        Tim Manajer/Supervisor akan segera mereview dan menyetujuinya.
      </p>
    </div>
  );
}
