import { IShop } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';

export class Shop extends Component<IShop> {
	protected shopContainer: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);

		this.shopContainer = ensureElement('.gallery', this.container);
	}

	set setCardList(items: HTMLElement[]) {
		this.shopContainer.replaceChildren(...items);
	}
}
