import { visibilityClassString } from 'Utility'
import { default as dateFormat } from 'DateFormat'

import EventDispatcher from 'Lib/EventDispatcher'

class DateInput extends EventDispatcher {
	constructor(element) {
		super()

		this.element = element
		this.element.classList.add( visibilityClassString() )

		const isInput = this.element.tagName == "INPUT"
		this.inputElement = isInput ? this.element : this.element.querySelector("input")

		this.minDate = new Date( this.inputElement.getAttribute("min") )
		this.maxDate = new Date( this.inputElement.getAttribute("max") )
	}

	getMinimumDate() { return this.minDate }
	getMaximumDate() { return this.maxDate }

	clearValue() {
		this.inputElement.value = ""
		this.changed()
	}

	valueUpdated(date) {
		this.inputElement.value = dateFormat(date, "yyyy-mm-dd")
		this.changed()
	}

	changed() {
		var event = new Event('change', {
		    'bubbles': true,
		    'cancelable': true
		})
		this.dispatchEvent({ type: "change" })
		this.inputElement.dispatchEvent(event)
	}
}

export default DateInput