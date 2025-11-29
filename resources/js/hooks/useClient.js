import { clientService } from "@/services/clientService";
import { useCrud } from "./useCrud";
import { useGetById } from "./useGetById";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => useCrud(clientService.dashboard, "client", "dashboard");
export const useOrderDetail = (orderId) => useGetById(clientService.order, "order", orderId);
export const useHistory = (orderId) => useGetById(clientService.history, "status", orderId);
export const usePayment = (orderId) => useGetById(clientService.payment, "payment", orderId);

