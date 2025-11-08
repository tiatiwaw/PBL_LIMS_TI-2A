import { serviceMethods } from "./baseService";

export const adminService = {
    dashboard: serviceMethods("/admin/dashboard"),
    brands: serviceMethods("/admin/tools/brands"),
};
