import EventDispatcher from 'Lib/EventDispatcher'

class NavButton extends EventDispatcher {
	constructor() {
		super()
		this.element = this.dom()
	}

	dom() {
		const element = document.createElement("button")
		element.classList.add("js-uglydate-nav-button")

		element.addEventListener("click", this.handleClick.bind(this), false)

		return element		
	}

	addClass(label) {
		this.element.classList.add("js-uglydate-" + label)
	}

	handleClick(evt) {
		evt.preventDefault()
		this.dispatchEvent({ type: "click" })
	}

	enable() {
		this.element.classList.remove("js-uglydate-nav-button-disabled")
	}

	disable() {
		this.element.classList.add("js-uglydate-nav-button-disabled")		
	}
}

export default NavButton