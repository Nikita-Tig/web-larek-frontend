import { IProduct, IProductList } from '../../types';
import { IEvents } from './events';

export class ShopModel {
	protected productList: IProductList;
	constructor(protected events: IEvents) {}

	setProducts(products: IProductList) {
		this.productList = products;
		this.events.emit('items:changed');
	}

	getProducts(): IProductList {
		return this.productList;
	}

	getProduct(id: string): IProduct {
		return this.productList.items.find((product) => product.id === id);
	}
}
