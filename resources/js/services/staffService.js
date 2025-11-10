import { serviceMethods } from "./baseService";

export const staffService = {
    clients: serviceMethods("/staff/manage-clients"),
    orders: serviceMethods("/staff/orders"),
    samples: serviceMethods("staff/orders/samples"),
};
