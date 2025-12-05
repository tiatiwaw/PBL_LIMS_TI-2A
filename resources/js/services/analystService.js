import { serviceMethods } from "./baseService";

export const analystService = {
    dashboard: serviceMethods("/analyst/dashboard", {useFormData: false,}),
    orders: serviceMethods("/analyst/orders", {useFormData: false,}),
    orderDetail: serviceMethods("/analyst/orders", {useFormData: false,}),
    samples: serviceMethods("/analyst/samples", {useFormData: false,}),
    acceptOrder: serviceMethods("/analyst/orders/accept", {useFormData: false,}),
    saveResult: serviceMethods("/analyst/orders/save", {useFormData: false,}),
    submitResult: serviceMethods("/analyst/orders/submit", {useFormData: false,}),
    downloadResult: serviceMethods("/analyst/orders/download", {useFormData: false,}),
    profile: serviceMethods("/analyst/profile/show", {useFormData: false,}),
    changePassword: serviceMethods("/analyst/profile/password", {useFormData: false,}),
};
