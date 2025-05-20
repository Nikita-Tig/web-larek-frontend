import { IOrder, IProductList } from '../../types';
import { Api } from './api';

export class ShopApi extends Api {
	getProducts(): Promise<IProductList> {
		return this.get<IProductList>('/product/');
	}

	sendOrder(order: IOrder): Promise<IOrder> {
		return this.post<IOrder>('/order', order);
	}
}
