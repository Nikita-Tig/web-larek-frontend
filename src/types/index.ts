import { IEvents } from "../components/base/events";

interface ApiProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

interface Payment {
    onlinePayment: boolean;
    adress: string;
}

interface Contacts {
    email: string;
    phone: string;
}

interface Oreder extends Contacts {
    products: ApiProduct[];
}

interface OrederReult extends ApiProduct {
    id: string;
}

interface CardData {
    category: string;
    title: string;
    description: string;
    image: string;
    price: number;
}
  
interface CompactCardData {
    title: string;
    price: number;
}

interface IBaseModal {
    item: HTMLElement;
    openModal(id: string): void;
    closeModal(id: string): void;
}

interface IBasketModel {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

interface IProduct {
    id: string;
    title: string;
}

interface ICatalogModel {
    items: IProduct[];
    setItems(items: IProduct[]): void;
    getProduct(id: string): IProduct;
}

interface IViewConstructor {
    new (container: HTMLElement, events?: IEvents): IView;
}

interface IView {
    render(data?: object): HTMLElement;
}