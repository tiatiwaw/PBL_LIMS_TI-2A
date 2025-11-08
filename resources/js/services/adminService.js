import { serviceMethods } from "./baseService";

export const adminService = {
    dashboard: serviceMethods("/admin"),
    brands: serviceMethods("/admin/tools/brands"),
};
