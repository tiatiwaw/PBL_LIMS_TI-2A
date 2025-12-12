import { generalService } from "@/services/generalService";
import { useCrud } from "./useCrud";

export const useNotifications = () =>
    useCrud(generalService.notifications, "notifications", "", {
        only: ["getAll"],
    });
