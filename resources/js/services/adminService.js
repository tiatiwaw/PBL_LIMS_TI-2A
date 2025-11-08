import { serviceMethods } from "./baseService";

export const adminService = {
    dashboard: serviceMethods("/admin"),
    equipments: serviceMethods("/admin/tools/equipments"),
    brands: serviceMethods("/admin/tools/brands"),
};
