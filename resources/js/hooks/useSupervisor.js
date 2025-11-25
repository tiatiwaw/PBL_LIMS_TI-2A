import { supervisorService } from "@/services/supervisorService";
import { useCrud } from "./useCrud";
import { useGetById } from "./useGetById";
import { useQuery } from "@tanstack/react-query";

export const useOrders = () =>
    useCrud(supervisorService.orders, "orders", "orders", { only: ["getAll"] });

export const useOrder = (id) =>
    useGetById(supervisorService.orders, "order", id);

export const useOrderParameters = (id) => {
    return useQuery({
        queryKey: ["orders", id, "parameters"],
        enabled: !!id,
        queryFn: () => supervisorService.orders.getRelated(id, "parameters"),
    });
};
