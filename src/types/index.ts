export interface IProduct {
	title: string;
	description: string;
	image: string;
	category: string;
	price: number;
	id: string;
	buttonState?: boolean;
}

export interface IProductList {
	total: number;
	items: IProduct[];
}

export interface IShop {
	setCardList: HTMLElement[];
}

export interface IHeader {
	setCounter: number;
}

export interface IBasket {
	setItemsList: HTMLElement[];
	setTotalPrice: number;
	setBasketBtn: IProduct[];
}

export interface IPayment {
	validationErrors: string;
}

export interface IPaymentErrors {
	paymentError: string;
	addressError: string;
}

export interface IContacts {
	validationErrors: string;
}

export interface IContactsErrors {
	emailError: string;
	phoneError: string;
}

export interface ISuccess {
	totalDeduction: number;
}

export interface IOrder extends IOrderData {
	total: number;
	items: string[];
}

export interface IOrderData {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IModals {}
