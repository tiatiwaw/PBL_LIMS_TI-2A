import { useState } from "react";
import { toast } from "sonner";
import { analystService } from "@/services/analystService";

export const useAcceptOrder = () => {
  const [loading, setLoading] = useState(false);

  const acceptOrder = async (orderId, onSuccess) => {
    if (!orderId) return;
    console.log("Accepting order with ID:", orderId);
    setLoading(true);

    try {
      const response = await analystService.acceptOrder.update(orderId);
      toast.success(response?.data?.message || "Pesanan berhasil diterima!");

      if (typeof onSuccess === "function") {
        onSuccess(response.data);
      }
    } catch (err) {
      const message = err.response?.data?.message || "Gagal menerima pesanan!";
      toast.error(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    acceptOrder,
    loading,
  };
};
