import { IPayment } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { EventEmitter } from './events';

export class Payment extends Component<IPayment> {
	protected cardPaymentBtn: HTMLButtonElement;
	protected cashPaymentBtn: HTMLButtonElement;
	protected addressInput: HTMLInputElement;
	protected errorField: HTMLElement;
	protected nextBtn: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.cardPaymentBtn = ensureElement(
			"[name = 'card']",
			this.container
		) as HTMLButtonElement;
		this.cashPaymentBtn = ensureElement(
			"[name = 'cash']",
			this.container
		) as HTMLButtonElement;
		this.addressInput = ensureElement(
			"[name = 'address']",
			this.container
		) as HTMLInputElement;
		this.errorField = ensureElement(
			'.form__errors',
			this.container
		) as HTMLElement;
		this.nextBtn = ensureElement(
			'.order__button',
			this.container
		) as HTMLButtonElement;

		this.cardPaymentBtn.addEventListener('click', () =>
			this.events.emit('validate:paymentType', { btn: this.cardPaymentBtn })
		);
		this.cashPaymentBtn.addEventListener('click', () =>
			this.events.emit('validate:paymentType', { btn: this.cashPaymentBtn })
		);

		this.addressInput.addEventListener('input', () =>
			this.events.emit('validate:address', { inputElement: this.addressInput })
		);

		this.nextBtn.addEventListener('click', (evt) => {
			evt.preventDefault();
			this.events.emit('modal:openContacts');
		});
	}

	togglePaymentBtns(btn: HTMLButtonElement) {
		if (btn === this.cardPaymentBtn) {
			this.toggleClass(btn, 'button_alt-active', true);
			this.toggleClass(this.cashPaymentBtn, 'button_alt-active', false);
		} else {
			this.toggleClass(btn, 'button_alt-active', true);
			this.toggleClass(this.cardPaymentBtn, 'button_alt-active', false);
		}
	}

	set validationError(err: string) {
		this.setText(this.errorField, err);
	}

	toggleNextBtn(validation: boolean) {
		if (validation) {
			this.nextBtn.disabled = false;
		} else {
			this.nextBtn.disabled = true;
		}
	}

	clearInputs() {
		this.toggleClass(this.cashPaymentBtn, 'button_alt-active', false);
		this.toggleClass(this.cardPaymentBtn, 'button_alt-active', false);
		this.addressInput.value = '';
	}
}
