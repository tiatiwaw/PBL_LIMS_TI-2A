import { serviceMethods } from "./baseService";

export const analystService = {
    dashboard: serviceMethods("/analyst/dashboard"),
    orders: serviceMethods("/analyst/orders"),
    samples: serviceMethods("/analyst/samples"),
    acceptOrder: serviceMethods("/analyst/orders/accept"),
    saveResult: serviceMethods("/analyst/orders/save"),
    submitResult: serviceMethods("/analyst/orders/submit"),
    downloadResult: serviceMethods("/analyst/orders/download"),
};
