import { supervisorService } from "@/services/supervisorService";
import { useCrud } from "./useCrud";
import { useGetById } from "./useGetById";

export const useOrders = () =>
    useCrud(supervisorService.orders, "orders", "orders", { only: ["getAll"] });

export const useOrder = (id) =>
    useGetById(supervisorService.orders, "order", id);
