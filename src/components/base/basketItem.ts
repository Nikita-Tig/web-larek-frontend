import { IProduct } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { EventEmitter } from './events';

export class BasketItem extends Component<IProduct> {
	protected itemTitle: HTMLElement;
	protected itemPrice: HTMLElement;
	protected itemDeleteBtn: HTMLButtonElement;
	protected productId: string;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.itemDeleteBtn = ensureElement(
			'.basket__item-delete',
			this.container
		) as HTMLButtonElement;

		this.itemTitle = ensureElement('.card__title', this.container);
		this.itemPrice = ensureElement('.card__price', this.container);

		this.itemDeleteBtn.addEventListener('click', () =>
			this.events.emit('basket:delete', { id: this.productId })
		);
	}

	set title(value: string) {
		this.setText(this.itemTitle, value);
	}

	set price(value: number) {
		this.setText(this.itemPrice, `${value} синапсов`);
	}

	set id(value: string) {
		this.productId = value;
	}
}
