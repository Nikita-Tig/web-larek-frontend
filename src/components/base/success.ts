import { ISuccess } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { EventEmitter } from './events';

export class Success extends Component<ISuccess> {
	protected closeBtn: HTMLButtonElement;
	protected total: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.total = ensureElement('.order-success__description', this.container);

		this.closeBtn = ensureElement(
			'.order-success__close',
			this.container
		) as HTMLButtonElement;
		this.closeBtn.addEventListener('click', () =>
			this.events.emit('modal:close')
		);
	}

	set totalDeduction(value: number) {
		this.setText(this.total, `Списано ${value} синапсов`);
	}
}
