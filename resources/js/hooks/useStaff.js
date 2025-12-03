import { staffService } from "@/services/staffService";
import { useCrud } from "./useCrud";
import { useGetById } from "./useGetById";

export const useClients = () =>
    useCrud(staffService.clients, "clients", "klien");

export const useOrders = () =>
    useCrud(staffService.makeOrders, "orders", "pesanan");

export const useAllOrders = () =>
    useCrud(staffService.allOrders, "orders", "pesanan", {
        only: ["getAll"],
    });

export const useOrder = (id) =>
    useGetById(staffService.allOrders, "orders", id);

export const useSamples = () =>
    useCrud(staffService.samples, "samples", "sampel");
