import { IContactsErrors, IOrder, IOrderData, IPaymentErrors, IProduct } from '../../types';
import { IEvents } from './events';

export class OrderModel {
	protected orderData: IOrderData = {
     payment: "",
     address: "",
     email: "",
     phone: "",

  }
  protected order: IOrder;
	protected total: number;
	protected productsId: string[];
  protected paymentErrors: IPaymentErrors;
  protected contactsErrors: IContactsErrors;

	constructor(protected events: IEvents) {}

	setPaymentType(value: string) {
		if (value === 'cash') {
			this.orderData.payment = 'upon receipt';
      if (this.validatePaymentForm()){
        this.events.emit("payment:ready")
      }
      return "cash"
		} else {
			this.orderData.payment = 'online';
      if (this.validatePaymentForm()){
        this.events.emit("payment:ready")
      }
      return "card"
		}
	}

	setInputValue(inputName: keyof IOrderData, inputValue: string) {
			this.orderData[inputName] = inputValue;
      if (this.validatePaymentForm()) {
        this.events.emit("payment:ready");
      }
    if (this.validateContactsForm()){
      this.events.emit("contacts:ready");
    }
}

	validatePaymentForm() {
    const errors = {} as IPaymentErrors
    if (!this.orderData.payment) {
      errors.paymentError = "Необходимо указать способ оплаты";
		}
    if (!this.orderData.address) {
      errors.addressError = "Необходимо указать адрес";
    }
    this.paymentErrors = errors;
		this.events.emit("payment:error", this.paymentErrors);
    return Object.values(errors).length === 0;
	}

	validateContactsForm() {
    const errors = {} as IContactsErrors
		if (!this.orderData.email) {
      errors.emailError = "Необходимо указать email";
		}
    if (!this.orderData.phone) {
      errors.phoneError = "Необходимо указать телефон";
    }
    this.contactsErrors = errors;
		this.events.emit("contacts:error", this.contactsErrors);
    return Object.values(errors).length === 0;
	}

	setTotalCost(value: number) {
		this.total = value;
	}

	setItems(products: IProduct[]) {
		this.productsId = [];
		products.map((item) => this.productsId.push(item.id));
	}

	setOrder(): IOrder {
		const payment = this.orderData.payment;
		const address = this.orderData.address;
		const email = this.orderData.email;
		const phone = this.orderData.phone;
		const total = this.total;
		const items = this.productsId;
		return (this.order = { payment, address, email, phone, total, items });
	}

	clearOrder() {
    this.orderData.payment = null;
		this.orderData.address = null;
		this.orderData.email = null;
		this.orderData.phone = null;
		this.total = null;
		this.productsId = null;
	}
}
