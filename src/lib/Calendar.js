import { visibilityClassString, withinRangeClassString, forEach } from 'Utility'

import Header from 'Lib/Header'
import Footer from 'Lib/Footer'
import Month from 'Lib/Month'
import DayCell from 'Lib/DayCell'
import EventDispatcher from 'Lib/EventDispatcher'

class Calendar extends EventDispatcher {
	constructor(constraints) {
		super()

		this.dayCells = []
		this.constraints = constraints
		this.currentVisibleMonth = 0

		this.element = this.dom()
		this.element.classList.add( visibilityClassString() )
	}

	appendTo(parentNode) {
		if(this.element.parentNode != parentNode) {
			if(this.element.parentNode) {
				this.element.parentNode.removeChild(this.element)
			}

			parentNode.appendChild(this.element)
		}		
	}

	computeMonthDimensions() {
		this.element.style.display = "block"
		requestAnimationFrame(() => {
			this.computedMonthDimensions = this.element.querySelector(".js-uglydate-month-container").getBoundingClientRect()
			this.element.style.display = ""
		})
	}

	getTotalRange() {
		const { minDate, maxDate } = this.constraints

		const yearsBetween = maxDate.getFullYear() - minDate.getFullYear()
		const monthsBetween = maxDate.getMonth() - minDate.getMonth()

		return monthsBetween + (yearsBetween * 12)		
	}

	dom() {
		const element = document.createElement("div")
		element.classList.add("js-uglydate-calendar")

		const header = new Header()
		const footer = new Footer()

		element.appendChild( header.element )
		element.appendChild( footer.element )
		element.appendChild( this.calendarElement() )

		footer.addEventListener("doneClick", this.handleDoneClick.bind(this))

		return element
	}

	toggle() {
		if(this.element.classList.contains( visibilityClassString() )) {
			this.open()
		}
		else {
			this.close()
		}
	}

	open() {
		this.element.classList.remove( visibilityClassString() )
		this.element.offsetWidth // force a DOM recalulation

		this.element.classList.add("js-uglydate-in")

		this.dispatchEvent({ type: "open" })
	}

	close() {
		this.element.classList.remove("js-uglydate-in")

		// one desktop we keep it around a beat just to acknowledge result. even w/ no animation this is nice.
		var timeoutDuration = 100
		if(false) {
			timeoutDuration = 500
		}

		setTimeout(() => {
			this.element.classList.add( visibilityClassString() )	
		}, timeoutDuration)

		this.dispatchEvent({ type: "close" })
	}

	calendarElement() {
		const { minDate, maxDate } = this.constraints
		const range = this.getTotalRange()

		// scroll viewport
		const element = document.createElement("div")
		element.classList.add("js-uglydate-calendar-scroll-viewport")

		// container
		const containerElement = document.createElement("div")
		containerElement.classList.add("js-uglydate-calendar-container-element")
		element.appendChild(containerElement)

		var currentMonth = new Date( minDate.getTime() )
		currentMonth.setDate(1)
		currentMonth.setHours(0)
		currentMonth.setMinutes(0)
		currentMonth.setSeconds(0)
		currentMonth.setMilliseconds(0)

		for(var i=0;i<=range;i++) {
			const month = new Month(currentMonth)

			// add a container to store the calendar
			const dayContainerElement = document.createElement("div")
			dayContainerElement.classList.add("js-uglydate-day-container")
			month.element.appendChild(dayContainerElement)

			// figure out the day the calendar should start
			var currentDate = month.getDate()
			const monthStartDay = month.date.getDay()
			currentDate.setDate(currentDate.getDate() - monthStartDay)

			// figure out the end of the month
			var monthEndDay = month.getDate()
			monthEndDay.setMonth(monthEndDay.getMonth() + 1)
			monthEndDay.setDate(monthEndDay.getDate() - 1)

			// figure out what today is
			let today = new Date()
			today.setHours(0)
			today.setMinutes(0)
			today.setSeconds(0)
			today.setMilliseconds(0)	

			// each calendar has 6 rows, one for each week.
			for(var j=0;j<6;j++) {

				// each week has 7 days.
				for(var k=0;k<7;k++) {
					const dayDate = new Date( currentDate.getTime() )

					const isLastDayOfMonth = dayDate.getTime() === monthEndDay.getTime()
					const isPriorMonth = dayDate.getTime() < currentMonth.getTime()
					const isNextMonth = dayDate.getTime() > monthEndDay.getTime()
					const isToday = dayDate.getTime() === today.getTime()
					const isOutsideRange = dayDate.getTime() < minDate.getTime() || dayDate.getTime() >= maxDate.getTime()

					const dayCell = new DayCell( dayDate, { isToday, isPriorMonth, isNextMonth, isLastDayOfMonth, isOutsideRange } )

					dayCell.addEventListener("hover", this.handleDayCellHover.bind(this))
					dayCell.addEventListener("click", this.handleDayCellClick.bind(this))

					dayContainerElement.appendChild(dayCell.element)
					this.dayCells.push(dayCell)

					currentDate.setDate(currentDate.getDate() + 1)
				}

			}

			containerElement.appendChild(month.element)
			currentMonth.setMonth(currentMonth.getMonth() + 1)
		}

		return element
	}

	prevVisibleMonth() {
		this.updateVisibleMonths(this.currentVisibleMonth - 1)
	}

	nextVisibleMonth() {
		this.updateVisibleMonths(this.currentVisibleMonth + 1)
	}

	updateVisibleMonths(index) {
		if(index < 0 || index > this.getTotalRange() - 1) {
			return
		}

		if(!this.computedMonthDimensions) {
			return
		}

		this.currentVisibleMonth = index
		var x = (this.computedMonthDimensions.width * this.currentVisibleMonth)
		this.element.querySelector(".js-uglydate-calendar-container-element").style.transform = "translate3d(-" + x + "px,0,0)"

		this.dispatchEvent({ type: "currentVisibleMonthUpdated", currentVisibleMonth: this.currentVisibleMonth })
	}

	clearRange() {
		const withinRangeCells = this.dayCells.filter((dayCell) => {
			return dayCell.isWithinRange()
		})

		forEach(withinRangeCells, (idx, dayCell) => {
			dayCell.setOutsideRange()
		})
	}

	rangeUpdated(startDayCell, endDayCell) {
		var startIndex = this.dayCells.indexOf(startDayCell)
		var endIndex = this.dayCells.indexOf(endDayCell)

		for(var i=startIndex;i<=endIndex;i++) {
			this.dayCells[i].setWithinRange()
		}		
	}

	handleDoneClick(evt) {
		this.dispatchEvent(evt)
	}

	handleDayCellHover(evt) {
		this.dispatchEvent({ type: "dayHover", dayCell: evt.dayCell })
	}

	handleDayCellClick(evt) {
		this.dispatchEvent({ type: "dayClick", dayCell: evt.dayCell })
	}
}

export default Calendar