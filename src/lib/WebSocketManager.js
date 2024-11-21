// WebSocketManager.js

class WebSocketManager {
	static instance;

	constructor(url) {
		if (WebSocketManager.instance) {
			return WebSocketManager.instance;
		}

		this.url = url;
		this.socket = null;
		this.eventListeners = {};

		WebSocketManager.instance = this;
	}

	connect() {
		this.socket = new WebSocket(this.url);

		this.socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const eventType = data.type;
			if (this.eventListeners[eventType]) {
				this.eventListeners[eventType].forEach((callback) => callback(data.payload));
			}
		};

		this.socket.onopen = () => console.log('WebSocket connection established');
		this.socket.onclose = () => console.log('WebSocket connection closed');
		this.socket.onerror = (error) => console.error('WebSocket error:', error);
	}

	on(eventType, callback) {
		if (!this.eventListeners[eventType]) {
			this.eventListeners[eventType] = [];
		}
		this.eventListeners[eventType].push(callback);
	}

	off(eventType, callback) {
		if (!this.eventListeners[eventType]) return;
		this.eventListeners[eventType] = this.eventListeners[eventType].filter((cb) => cb !== callback);
	}
}

export default WebSocketManager;
