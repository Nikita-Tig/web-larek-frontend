import { IContacts } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { EventEmitter } from './events';

export class Contacts extends Component<IContacts> {
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;
	protected errorField: HTMLElement;
	protected nextBtn: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.emailInput = ensureElement(
			"[name = 'email']",
			this.container
		) as HTMLInputElement;
		this.phoneInput = ensureElement(
			"[name = 'phone']",
			this.container
		) as HTMLInputElement;
		this.errorField = ensureElement(
			'.form__errors',
			this.container
		) as HTMLElement;
		this.nextBtn = ensureElement(
			'.button',
			this.container
		) as HTMLButtonElement;

		this.emailInput.addEventListener('input', () =>
			this.events.emit('validate:email', { inputElement: this.emailInput })
		);
		this.phoneInput.addEventListener('input', () =>
			this.events.emit('validate:phone', { inputElement: this.phoneInput })
		);

		this.nextBtn.addEventListener('click', (evt) => {
			evt.preventDefault();
			this.events.emit('form:submit');
		});
	}

	set validationError(err: string) {
		this.setText(this.errorField, err);
	}

	toggleNextBtn(validation: boolean) {
		if (validation) {
			this.nextBtn.disabled = false;
		} else {
			this.nextBtn.disabled = true;
		}
	}

	clearInputs() {
		this.emailInput.value = '';
		this.phoneInput.value = '';
	}
}
