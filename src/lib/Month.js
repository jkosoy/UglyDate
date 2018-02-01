import { default as dateFormat } from 'DateFormat'

import Header from 'Lib/Header'
import EventDispatcher from 'Lib/EventDispatcher'

class Month extends EventDispatcher {
	constructor(date) {
		super()
		this.date = date
		this.element = this.dom()
	}

	dom() {
		const element = document.createElement("div")
		element.classList.add("js-uglydate-month-container")

		const headerElement = document.createElement("div")
		headerElement.classList.add("js-uglydate-month-header")
		headerElement.innerHTML = dateFormat(this.date, "mmmm")
		element.appendChild(headerElement)

		// for desktop, copy the M T W Th F thing
		element.appendChild( new Header().element )

		return element		
	}

	getDate() {
		return new Date( this.date.getTime() )
	}

}

export default Month