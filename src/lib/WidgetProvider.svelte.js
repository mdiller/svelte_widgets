import { WidgetInfo } from '../lib/WidgetInfo.svelte.js';

export class WidgetProvider {
	/** @type { WidgetInfo[] } */
	widgets = $state([]);
	constructor() {
		this.jsonname = "widgetcontainer_1"
		this.widgets = [];
	}

	async add(widget_id, widget_type) {
		let widget = new WidgetInfo(widget_id, widget_type);
		this.widgets.push(widget)
		await this.save();
	}

	async remove(widget) {
		this.widgets = this.widgets.filter(w => w != widget)
		await this.save();
	}

	get(widget_id) {
		this.widgets.find(w => w.id == widget_id);
	}

	async load() {
		try {
			const response = await fetch(`http://localhost:8080/readjson/${this.jsonname}`);
			if (!response.ok) {
				throw new Error('Failed to fetch');
			}
			let data = await response.json();
			if (data != null) {
				this.widgets = data.widgets.map(WidgetInfo.fromJSON);
			}
			else {
				this.widgets = [
					new WidgetInfo("example_widget", "glasses")
				];
			}
			return this.widgets;
		} catch (error) {
			console.error('Error fetching widget data:', error);
		}
	}

	async save() {
		try {
			const data = {
				widgets: this.widgets.map(widget => widget.toJSON())
			};
			const jsonPayload = JSON.stringify(data);

			const response = await fetch(`http://localhost:8080/writejson/${this.jsonname}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: jsonPayload
			});

			if (!response.ok) {
				throw new Error('Failed to send data');
			}

			console.log('Data sent successfully');
		} catch (error) {
			console.error('Error sending data:', error);
		}
	}
}
