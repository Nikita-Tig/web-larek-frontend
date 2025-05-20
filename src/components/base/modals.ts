import { IModals } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { EventEmitter, IEvents } from './events';

export class Modals extends Component<IModals> {
	protected modalContainer: HTMLElement;
	protected modalContent: HTMLElement;
	protected modalCloseBtn: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.modalContainer = ensureElement('.modal__container', this.container);
		this.modalContent = ensureElement('.modal__content', this.container);
		this.modalCloseBtn = ensureElement(
			'.modal__close',
			this.container
		) as HTMLButtonElement;

		this.modalCloseBtn.addEventListener('click', () =>
			this.events.emit('modal:close')
		);
		this.container.addEventListener('click', () =>
			this.events.emit('modal:close')
		);
		this.modalContainer.addEventListener('click', (event) =>
			event.stopPropagation()
		);
	}

	openModal(item: HTMLElement) {
		document.addEventListener('keyup', (e) => {
			if (e.key === 'Escape') {
				this.events.emit('modal:close');
			}
		});
		this.toggleClass(this.container, 'modal_active', true);
		this.modalContent.replaceChildren(item);
	}

	closeModal() {
		this.toggleClass(this.container, 'modal_active', false);
		document.removeEventListener('keyup', (e) => {
			if (e.key === 'Escape') {
				this.events.emit('modal:close');
			}
		});
	}
}
