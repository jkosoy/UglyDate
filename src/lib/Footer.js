import EventDispatcher from 'Lib/EventDispatcher'

class Footer extends EventDispatcher {
	constructor() {
		super()
		this.element = this.dom()
	}

	dom() {
		const element = document.createElement("div")

		const doneButton = document.createElement("div")
		doneButton.classList.add("js-uglydate-done-button")
		doneButton.innerText = "Done"
		doneButton.addEventListener("click", this.handleDoneClick.bind(this), false)

		element.appendChild(doneButton)

		element.classList.add("js-uglydate-footer")


		return element		
	}

	handleDoneClick(evt) {
		evt.preventDefault()
		this.dispatchEvent({ type: "doneClick" })
	}
}

export default Footer