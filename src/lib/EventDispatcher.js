import { forEach } from 'Utility'

class EventDispatcher {
	constructor() {
		this.initChannels()
	}

	initChannels() {
		this.channels = {}
	}

	initChannel(channel) {
		this.channels[channel] = []
	}

	getListenersForChannel(channel) {
		if(!this.channels[channel]) {
			this.initChannel(channel)
		}

		return this.channels[channel]
	}

	addEventListener(channel, callback) {
		let listeners = this.getListenersForChannel(channel)
		listeners.push(callback)
	}

	removeEventListener(channel, callback) {
		let listeners = this.getListenersForChannel(channel)
		let idx = listeners.indexOf(callback)

		if(idx !== -1) {
			listeners.splice(idx, 1)
		}
	}

	hasEventListener(channel, callback) {
		let listeners = this.getListenersForChannel(channel)
		let idx = listeners.indexOf(callback)

		return idx !== -1
	}

	dispatchEvent(event) {
		const { type } = event
		let listeners = this.getListenersForChannel(type)
		
		forEach(listeners, (idx, listener) => {
			listener.call( this, event )
		})
	}

	removeAllListenersForChannel(channel) {
		this.initChannel(channel)
	}

	removeAllListeners() {
		this.initChannels()
	}
}

export default EventDispatcher