export interface IProduct {
	title: string;
	description: string;
	image: string;
	category: string;
	price: number;
	id: string;
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
	validationError: string;
}

export interface IContacts {
	validationError: string;
}

export interface ISuccess {
	totalDeduction: number;
}

export interface IOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
}

export interface IModals {}
