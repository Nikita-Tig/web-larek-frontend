import { IProduct, IProductList } from '../../types';
import { IEvents } from './events';

export class BasketModel {
	protected products: IProduct[] = [];

	constructor(protected events: IEvents) {}

	addItem(product: IProduct) {
		if (!this.products.includes(product)) {
			this.products = [product, ...this.products];
			this.events.emit('basketItems:changed');
		} else {
			return;
		}
	}

	deleteItem(id: string) {
		this.products = this.products.filter((product) => product.id !== id);
		this.events.emit('basketItems:changed');
	}

	clearItems() {
		this.products = [];
		this.events.emit('basketItems:changed');
	}

	getItems() {
		return this.products;
	}

	getItem(id: string): IProduct {
		return this.products.find((product) => product.id === id);
	}

	getTotalPrice(): number {
		const productsPrices: number[] = [];
		this.products.map((item) => {
			productsPrices.push(item.price);
		});
		return productsPrices.reduce((a, b) => {
			return a + b;
		}, 0);
	}
}
