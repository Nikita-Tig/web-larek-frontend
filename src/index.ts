import { Basket } from './components/base/basket';
import { BasketItem } from './components/base/basketItem';
import { BasketModel } from './components/base/basketModel';
import { Card } from './components/base/card';
import { CardPreview } from './components/base/cardPreview';
import { Contacts } from './components/base/contacts';
import { EventEmitter } from './components/base/events';
import { Header } from './components/base/header';
import { Modals } from './components/base/modals';
import { OrderModel } from './components/base/orderModel';
import { Payment } from './components/base/payment';
import { Shop } from './components/base/shop';
import { ShopApi } from './components/base/shopApi';
import { ShopModel } from './components/base/shopModel';
import { Success } from './components/base/success';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';

const events = new EventEmitter();
const shopModel = new ShopModel(events);
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);

const cardTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const basketItemTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const paymentTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;
const successTemplate = document.querySelector(
	'#success'
) as HTMLTemplateElement;

const basketHTMLElement = cloneTemplate(basketTemplate);
const paymentHTMLElement = cloneTemplate(paymentTemplate);
const contactsHTMLElement = cloneTemplate(contactsTemplate);
const successHTMLElement = cloneTemplate(successTemplate);

const api = new ShopApi(API_URL);
const header = new Header(
	document.querySelector('.header__container') as HTMLElement,
	events
);
const shop = new Shop(document.querySelector('.page__wrapper') as HTMLElement);
const modal = new Modals(
	document.querySelector('#modal-container') as HTMLElement,
	events
);
const payment = new Payment(paymentHTMLElement as HTMLElement, events);
const contacts = new Contacts(contactsHTMLElement as HTMLElement, events);
const success = new Success(successHTMLElement as HTMLElement, events);

api
	.getProducts()
	.then((data) => {
		shopModel.setProducts(data);
	})
	.catch((err) => console.log(err));

events.on('items:changed', () => {
	const cardsHTMLArray = shopModel.getProducts().items.map((item) =>
		new Card(cloneTemplate(cardTemplate), events).render({
			title: item.title,
			image: CDN_URL + item.image.replace('.svg', '.png'),
			category: item.category,
			price: item.price,
			id: item.id,
		})
	);

	shop.render({
		setCardList: cardsHTMLArray,
	});
});

events.on('modal:openPreview', ({ id }: { id: string }) => {
	const product = shopModel.getProduct(id);
	const previewHTMLElement = new CardPreview(
		cloneTemplate(cardPreviewTemplate),
		events
	).render({
		title: product.title,
		description: product.description,
		image: CDN_URL + product.image.replace('.svg', '.png'),
		category: product.category,
		price: product.price,
		id: product.id,
	});

	modal.openModal(previewHTMLElement);
});

events.on('basketItems:changed', () => {
	const basket = new Basket(basketHTMLElement as HTMLElement, events);
	const basketItemsHTMLArray = basketModel.getItems().map((item) =>
		new BasketItem(cloneTemplate(basketItemTemplate), events).render({
			title: item.title,
			price: item.price,
			id: item.id,
		})
	);

	basket.render({
		setItemsList: basketItemsHTMLArray,
		setTotalPrice: basketModel.getTotalPrice(),
		setBasketBtn: basketModel.getItems(),
	});

	header.render({
		setCounter: basketItemsHTMLArray.length,
	});
});

events.on('modal:openBasket', () => {
	modal.openModal(basketHTMLElement);
});

events.on('modal:close', () => {
	modal.closeModal();
});

events.on('basket:add', ({ id }: { id: string }) => {
	basketModel.addItem(shopModel.getProduct(id));
});

events.on('basket:delete', ({ id }: { id: string }) => {
	basketModel.deleteItem(id);
});

events.on('modal:openPayment', () => {
	payment.toggleNextBtn(orderModel.validatePaymentForm());
	modal.openModal(paymentHTMLElement);
});

events.on('validate:paymentType', ({ btn }: { btn: HTMLButtonElement }) => {
	orderModel.setPaymentType(btn.name);
	payment.togglePaymentBtns(btn);
	payment.toggleNextBtn(orderModel.validatePaymentForm());
});

events.on(
	'validate:address',
	({ inputElement }: { inputElement: HTMLInputElement }) => {
		payment.render({
			validationError: orderModel.validateInput(
				inputElement,
				inputElement.name
			),
		});
		payment.toggleNextBtn(orderModel.validatePaymentForm());
	}
);

events.on('modal:openContacts', () => {
	payment.clearInputs();
	contacts.toggleNextBtn(orderModel.validateContactsForm());
	modal.openModal(contactsHTMLElement);
});

events.on(
	'validate:email',
	({ inputElement }: { inputElement: HTMLInputElement }) => {
		contacts.render({
			validationError: orderModel.validateInput(
				inputElement,
				inputElement.name
			),
		});
		contacts.toggleNextBtn(orderModel.validateContactsForm());
	}
);

events.on(
	'validate:phone',
	({ inputElement }: { inputElement: HTMLInputElement }) => {
		contacts.render({
			validationError: orderModel.validateInput(
				inputElement,
				inputElement.name
			),
		});
		contacts.toggleNextBtn(orderModel.validateContactsForm());
	}
);

events.on('form:submit', () => {
	orderModel.setTotalCost(basketModel.getTotalPrice());
	orderModel.setItems(basketModel.getItems());
	api
		.sendOrder(orderModel.order())
		.then(() => {
			success.render({
				totalDeduction: basketModel.getTotalPrice(),
			});
			basketModel.clearItems();
			contacts.clearInputs();
			orderModel.clearOrder();
			modal.openModal(successHTMLElement);
		})
		.catch((err) => {
			console.log(err);
		});
});
