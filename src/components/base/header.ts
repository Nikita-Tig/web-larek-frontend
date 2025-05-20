import { IHeader } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { EventEmitter } from './events';

export class Header extends Component<IHeader> {
	protected counter: HTMLElement;
	protected basketBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: EventEmitter) {
		super(container);

		this.counter = ensureElement('.header__basket-counter', this.container);
		this.basketBtn = ensureElement(
			'.header__basket',
			this.container
		) as HTMLButtonElement;

		this.basketBtn.addEventListener('click', () =>
			events.emit('modal:openBasket')
		);
	}

	set setCounter(value: number) {
		this.setText(this.counter, value);
	}
}
