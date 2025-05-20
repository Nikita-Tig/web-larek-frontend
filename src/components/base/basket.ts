import { IBasket, IProduct } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { EventEmitter } from './events';

export class Basket extends Component<IBasket> {
	protected basketList: HTMLElement;
	protected totalPrice: HTMLElement;
	protected basketBtn: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.basketList = ensureElement('.basket__list', this.container);
		this.totalPrice = ensureElement('.basket__price', this.container);
		this.basketBtn = ensureElement(
			'.basket__button',
			this.container
		) as HTMLButtonElement;

		this.basketBtn.addEventListener('click', () =>
			this.events.emit('modal:openPayment')
		);
	}

	set setItemsList(items: HTMLElement[]) {
		this.basketList.replaceChildren(...items);
	}

	set setTotalPrice(value: number) {
		this.setText(this.totalPrice, `${value} синапсов`);
	}

	set setBasketBtn(items: IProduct[]) {
		if (items.length < 1) {
			this.setDisabled(this.basketBtn, true);
		} else {
			this.setDisabled(this.basketBtn, false);
		}
	}
}
