import { forEach } from 'Utility'

import DateSelector from 'Lib/DateSelector'
import EventDispatcher from 'Lib/EventDispatcher'

class Main extends EventDispatcher {
	constructor(params) {
		super()

		const options = Object.assign({}, {
			selector: "[data-uglydate]",
			startDateSelector: "[data-uglydate-start-date]",
			endDateSelector: "[data-uglydate-end-date]"
		}, params)

		const { selector } = options

		let elements = document.querySelectorAll(selector)
		this.dateSelectors = []

		forEach(elements, (idx, element) => {
			const { startDateSelector, endDateSelector } = options
			const dateSelector = new DateSelector(element, { startDateSelector, endDateSelector })
			dateSelector.addEventListener("open", this.dispatchEvent.bind(this))
			dateSelector.addEventListener("close", this.dispatchEvent.bind(this))
			dateSelector.addEventListener("change", this.dispatchEvent.bind(this))
			this.dateSelectors.push(dateSelector)
		})
	}
}

export default Main