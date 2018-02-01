import Calendar from 'Lib/Calendar'
import DateInput from 'Lib/DateInput'
import NavButton from 'Lib/NavButton'
import DisplayDate from 'Lib/DisplayDate'
import EventDispatcher from 'Lib/EventDispatcher'

class DateSelector extends EventDispatcher {
	constructor(element, params) {
		super()

		const { startDateSelector, endDateSelector } = params

		this.element = element

		this.startDate = new DateInput(element.querySelector(startDateSelector))
		this.endDate = new DateInput(element.querySelector(endDateSelector))

		this.displayDate = new DisplayDate(this.startDate.inputElement.cloneNode(true))
		this.displayDate.addEventListener("click", this.handleDisplayDateClick.bind(this))
		this.element.appendChild(this.displayDate.element)

		this.calendar = new Calendar( this.dateConstraints() )

		this.calendar.addEventListener("open", this.handleCalendarOpen.bind(this))
		this.calendar.addEventListener("close", this.handleCalendarClose.bind(this))
		this.calendar.addEventListener("dayHover", this.handleCalendarDayHover.bind(this))
		this.calendar.addEventListener("dayClick", this.handleCalendarDayClick.bind(this))
		this.calendar.addEventListener("doneClick", this.handleCalendarDoneClick.bind(this))
		this.calendar.addEventListener("currentVisibleMonthUpdated", this.handleCurrentVisibleMonthUpdated.bind(this))

		// next prev buttons
		this.nextButton = new NavButton()
		this.prevButton = new NavButton()

		this.nextButton.addEventListener("click", this.handleNextButtonClick.bind(this))
		this.nextButton.addClass("next-button")

		this.prevButton.addEventListener("click", this.handlePrevButtonClick.bind(this))
		this.prevButton.addClass("prev-button")

		this.calendar.element.appendChild(this.nextButton.element)
		this.calendar.element.appendChild(this.prevButton.element)

		this.element.appendChild(this.calendar.element)

		this.handleCurrentVisibleMonthUpdated({ currentVisibleMonth: 0 })

		window.addEventListener("resize", this.handleWindowResize.bind(this), false)
		this.handleWindowResize()
	}

	handlePrevButtonClick(evt) {
		this.calendar.prevVisibleMonth()
	}

	handleNextButtonClick(evt) {
		this.calendar.nextVisibleMonth()
	}

	handleCalendarOpen(evt) {
		this.lastSelectedStartDayCell = this.selectedStartDayCell
		this.lastSelectedEndDayCell = this.selectedEndDayCell		

		this.dispatchEvent({ type: "open" })
	}

	handleCalendarClose(evt) {
		this.lastSelectedStartDayCell = null
		this.lastSelectedEndDayCell = null

		this.dispatchEvent({ type: "close" })
	}

	handleCalendarDayClick(evt) {
		const { dayCell } = evt

		if(this.selectedStartDayCell && this.selectedEndDayCell) {
			this.resetSelectedDayCells()
		}

		if(this.selectedStartDayCell) {
			if(evt.dayCell.getDate().getTime() < this.selectedStartDayCell.getDate().getTime()) {
				this.resetSelectedDayCells()
			}
		}

		if(!this.selectedStartDayCell) {
			this.selectStartDayCell(dayCell)
		}
		else if(!this.selectedEndDayCell) {
			this.selectEndDayCell(dayCell)
		}
	}

	handleCalendarDayHover(evt) {
		const { dayCell } = evt

		if(!this.selectedStartDayCell || this.selectedEndDayCell) {
			return
		}

		this.rangeUpdated(this.selectedStartDayCell, dayCell)
	}

	handleCalendarDoneClick(evt) {
		if(this.selectedStartDayCell && this.selectedEndDayCell) {
			this.valuesUpdated()
		}
		else if(this.selectedStartDayCell) {
			if(this.lastSelectedStartDayCell && this.lastSelectedEndDayCell) {
				this.selectStartDayCell(this.lastSelectedStartDayCell)
				this.selectEndDayCell(this.lastSelectedEndDayCell)
			}
			else {
				this.resetSelectedDayCells()
			}
		}

		this.calendar.close()
	}

	handleCurrentVisibleMonthUpdated(evt) {
		const { currentVisibleMonth } = evt

		if(currentVisibleMonth == 0) {
			this.prevButton.disable()
		}
		else {
			this.prevButton.enable()
		}
		
		const totalRange = this.calendar.getTotalRange()
		if(currentVisibleMonth == totalRange - 2) {
			this.nextButton.disable()
		}
		else {
			this.nextButton.enable()
		}
	}

	handleDisplayDateClick(evt) {
		this.calendar.toggle()
	}

	handleWindowResize(evt) {
		// handle resize
		var vw = window.innerWidth

		var breakpoint = this.element.dataset.uglydateLargeScreenWidth
		if(!breakpoint) {
			return
		}

		const lastMode = this.mode
		this.mode = (vw >= breakpoint) ? "desktop" : "mobile"

		if(this.mode != lastMode) {
			this.modeUpdated()
		}
	}

	dateConstraints() {
		let minDate = this.startDate.getMinimumDate()
		let maxDate = this.endDate.getMaximumDate()

		return { minDate, maxDate }		
	}

	modeUpdated() {
		this.decideDOMPosition()
		this.recalculateDimensions()
		this.decideScrollPosition()
	}

	decideDOMPosition() {
		const parentNode = (this.mode == "desktop") ? this.element : document.body
		this.calendar.appendTo(parentNode)
	}

	recalculateDimensions() {
		if(this.mode != "desktop") {
			return
		}		

		this.calendar.computeMonthDimensions()
	}

	decideScrollPosition() {
		if(this.mode == "mobile") {
			this.calendar.updateVisibleMonths(0)
		}
		else {
			this.calendar.updateVisibleMonths(this.calendar.currentVisibleMonth)
		}			
	}

	resetSelectedDayCells() {
		this.clearRange()
		this.clearStartDayCell()
		this.clearEndDayCell()
	}

	clearStartDayCell() {
		if(this.selectedStartDayCell) {
			this.selectedStartDayCell.deselect()
			this.selectedStartDayCell = null
		}
	}

	clearEndDayCell() {
		if(this.selectedEndDayCell) {
			this.selectedEndDayCell.deselect()
			this.selectedEndDayCell = null
		}
	}

	selectStartDayCell(dayCell) {
		this.clearStartDayCell()

		this.selectedStartDayCell = dayCell
		this.selectedStartDayCell.select("start")
	}

	selectEndDayCell(dayCell) {
		if(!this.selectedStartDayCell) {
			console.warn("Trying to set an end date without a start date. Ignorning.")
			return
		}

		this.clearEndDayCell()
		this.selectedEndDayCell = dayCell
		this.selectedEndDayCell.select("end")

		this.rangeUpdated(this.selectedStartDayCell, this.selectedEndDayCell)
		this.valuesUpdated()

		if(this.mode == "desktop") {
			this.calendar.close()
		}
	}

	clearRange() {
		this.calendar.clearRange()
	}

	rangeUpdated(startDayCell, endDayCell) {
		this.clearRange()
		this.calendar.rangeUpdated(startDayCell, endDayCell)
	}

	valuesUpdated() {
		const startDate = this.selectedStartDayCell.getDate()
		const endDate = this.selectedEndDayCell.getDate()
		const type = "change"

		this.startDate.valueUpdated(startDate)
		this.endDate.valueUpdated(endDate)
		this.displayDate.valueUpdated(startDate, endDate)
		this.dispatchEvent({ type, startDate, endDate })
	}
}

export default DateSelector