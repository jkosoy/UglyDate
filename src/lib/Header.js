import { forEach } from 'Utility'
import EventDispatcher from 'Lib/EventDispatcher'

class Header extends EventDispatcher {
	constructor() {
		super()
		this.element = this.dom()
	}

	dom() {
		const element = document.createElement("div")
		element.classList.add("js-uglydate-header")

		forEach(["S", "M", "T", "W", "Th", "F", "S"], (idx, label) => {
			var span = document.createElement("span")
			span.classList.add("js-uglydate-header-day")
			span.innerText = label

			element.appendChild(span)
		})

		return element		
	}

}

export default Header