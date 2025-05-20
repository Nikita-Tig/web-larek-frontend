import { IProduct } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { EventEmitter } from './events';

export class CardPreview extends Component<IProduct> {
	protected cardTitle: HTMLElement;
	protected cardImage: HTMLImageElement;
	protected cardCategory: HTMLElement;
	protected cardDescription: HTMLElement;
	protected cardPrice: HTMLElement;
	protected cardButton: HTMLButtonElement;
	protected productId: string;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.cardButton = ensureElement(
			'.card__button',
			this.container
		) as HTMLButtonElement;

		this.cardTitle = ensureElement('.card__title', this.container);
		this.cardDescription = ensureElement('.card__text', this.container);
		this.cardImage = ensureElement(
			'.card__image',
			this.container
		) as HTMLImageElement;
		this.cardCategory = ensureElement('.card__category', this.container);
		this.cardPrice = ensureElement('.card__price', this.container);

		this.cardButton.addEventListener('click', () =>
			this.events.emit('basket:add', { id: this.productId })
		);
	}

	set title(value: string) {
		this.setText(this.cardTitle, value);
	}

	set description(value: string) {
		this.setText(this.cardDescription, value);
	}

	set image(value: string) {
		this.setImage(this.cardImage, value, this.title);
	}

	set category(value: string) {
		this.setText(this.cardCategory, value);
	}

	set price(value: number) {
		this.setText(this.cardPrice, `${value} синапсов`);
	}

	set id(value: string) {
		this.productId = value;
	}
}
