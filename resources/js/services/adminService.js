import api from "@/lib/api";
import { serviceMethods } from "./baseService";

export const adminService = {
    getDashboard: () => api.get("/admin").then((res) => res.data),
    brands: serviceMethods("/admin/tools/brands"),
};
