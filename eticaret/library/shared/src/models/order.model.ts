import { BasketModel } from "./basket.model";

export interface OrderModel{
    id?: string;
    userId: string;
    orderNumber: string;
    date: Date;
    fullName: string;
    phoneNumber: string;
    city: string;
    district: string;
    fullAddress: string;
    cardNumber: string;
    cardOwnerName: string;
    expiresDate: string;
    cvv: number;
    installmentOptions: string;
    status: string;
    baskets: BasketModel[];
}

export const initialOrder: OrderModel = {
    fullName: "",
    userId: "",
    orderNumber: "",
    date: new Date(),
    phoneNumber: "",
    city: "",
    district: "",
    fullAddress: "",
    cardNumber: "",
    cardOwnerName: "",
    expiresDate: "",
    cvv: 0,
    installmentOptions: "Tek çekim",
    status: "",
    baskets: []
}