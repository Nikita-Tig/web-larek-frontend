import { IContacts, IOrder, IPayment, IProduct } from '../../types';
import { IEvents } from './events';

export class OrderModel {
	protected orderData: IOrder;
	protected payment: string;
	protected address: string;
	protected email: string;
	protected phone: string;
	protected total: number;
	protected productsId: string[];

	constructor(protected events: IEvents) {}

	setPaymentType(value: string) {
		if (value === 'cash') {
			this.payment = 'upon receipt';
		} else {
			this.payment = 'online';
		}
	}

	validateInput(inputElement: HTMLInputElement, elementName: string): string {
		if (!inputElement.validity.valid) {
			switch (elementName) {
				case 'address':
					this.address = null;
					break;
				case 'email':
					this.email = null;
					break;
				case 'phone':
					this.phone = null;
					break;
			}
			return inputElement.validationMessage;
		} else {
			switch (elementName) {
				case 'address':
					this.address = inputElement.value;
					break;
				case 'email':
					this.email = inputElement.value;
					break;
				case 'phone':
					this.phone = inputElement.value;
					break;
			}
			return '';
		}
	}

	validatePaymentForm() {
		if ((this.address && this.payment != null) || undefined) {
			return true;
		}
		return false;
	}

	validateContactsForm() {
		if ((this.email && this.phone != null) || undefined) {
			return true;
		}
		return false;
	}

	setTotalCost(value: number) {
		this.total = value;
	}

	setItems(products: IProduct[]) {
		this.productsId = [];
		products.map((item) => this.productsId.push(item.id));
	}

	order(): IOrder {
		const payment = this.payment;
		const address = this.address;
		const email = this.email;
		const phone = this.phone;
		const total = this.total;
		const items = this.productsId;
		return (this.orderData = { payment, address, email, phone, total, items });
	}

	clearOrder() {
    this.payment = null;
		this.address = null;
		this.email = null;
		this.phone = null;
		this.total = null;
		this.productsId = null;
	}
}
