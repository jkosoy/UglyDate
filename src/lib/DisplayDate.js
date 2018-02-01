import { visibilityClassString } from 'Utility'
import { default as dateFormat } from 'DateFormat'

import EventDispatcher from 'Lib/EventDispatcher'

class DisplayDate extends EventDispatcher {
	constructor(element) {
		super()

		this.element = element
		this.element.setAttribute("type", "text")
		this.element.setAttribute("readonly", "readonly")
		this.element.classList.add("js-uglydate-text-input")
		this.element.setAttribute("id", "js-uglydate-text-input")

		this.element.addEventListener("click", this.handleClick.bind(this), false)
	}

	handleClick(evt) {
		evt.preventDefault()
		this.dispatchEvent({ type: "click" })
	}

	clearValue() {
		this.value = ""
		this.changed()
	}

	valueUpdated(startDate, endDate) {
		var value = dateFormat(startDate, "ddd, mmm d") + " - " + dateFormat(endDate, "ddd, mmm d")

		if(startDate.getTime() == endDate.getTime()) {
			value = dateFormat(startDate, "ddd, mmm d")
		}

		this.element.value = value
		this.changed()
	}

	changed() {
		var event = new Event('change', {
		    'bubbles': true,
		    'cancelable': true
		})		

		this.dispatchEvent({ type: "change" })
		this.element.dispatchEvent(event)
	}
}

export default DisplayDate