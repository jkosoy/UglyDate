import { default as dateFormat } from 'DateFormat'
import { withinRangeClassString } from 'Utility'

import EventDispatcher from 'Lib/EventDispatcher'

class DayCell extends EventDispatcher {
	constructor(date, params) {
		super()
		this.date = date
		this.params = params
		this.element = this.dom()
	}

	dom() {
		const element = document.createElement("button")
		const { isPriorMonth, isLastDayOfMonth, isNextMonth, isToday, isOutsideRange } = this.params
		const isDisabledDate = isPriorMonth || isNextMonth || isOutsideRange

		element.classList.add("js-uglydate-day")
		element.setAttribute("aria-label", dateFormat(this.date, "mmmm d, yyyy"))
		element.date = new Date(this.date.getTime())

		if(isPriorMonth) {
			element.classList.add("js-uglydate-prev-month-day")
		}

		if(isLastDayOfMonth) {
			element.classList.add("js-uglydate-is-last-day-of-month")
		}

		if(isNextMonth) {
			element.classList.add("js-uglydate-next-month-day")
		}

		if(isToday) {
			element.classList.add("js-uglydate-is-today")
		}

		if(isDisabledDate) {
			element.classList.add("js-uglydate-is-disabled-date")
		}

		var dayButton = document.createElement("span")
		dayButton.classList.add("js-uglydate-day-button")
		dayButton.innerText = dateFormat(this.date, "d")

		if(!isDisabledDate) {
			element.addEventListener("mouseover", this.handleHover.bind(this), false)
			element.addEventListener("click", this.handleClick.bind(this), false)
		}

		element.appendChild(dayButton)

		return element		
	}

	deselect() {
		this.element.classList.remove("js-uglydate-is-selected-start-day")
		this.element.classList.remove("js-uglydate-is-selected-start-day")
		this.element.classList.remove("js-uglydate-is-selected-day")		
	}

	select(state) {
		this.element.classList.add("js-uglydate-is-selected-" + state + "-day")
		this.element.classList.add("js-uglydate-is-selected-day")
	}

	setWithinRange() {
		this.element.classList.add(withinRangeClassString())
	}

	setOutsideRange() {
		this.element.classList.remove(withinRangeClassString())
	}

	isWithinRange() {
		return this.element.classList.contains(withinRangeClassString())
	}

	getDate() {
		return new Date( this.date.getTime() )
	}

	handleHover(evt) {
		evt.preventDefault()
		this.dispatchEvent({ type: "hover", dayCell: this })
	}

	handleClick(evt) {
		evt.preventDefault()
		this.dispatchEvent({ type: "click", dayCell: this })
	}
}

export default DayCell
