

export class WidgetInfo {
	id = $state(null);
	posX = $state(0);
	posY = $state(0);
	width = $state(300);
	height = $state(300);
	aspectRatio = $state(undefined);
	type = $state(null);

	constructor(id, type) {
		this.id = id;
		this.type = type;
	}

	// Method to populate the instance from JSON data
	static fromJSON(json) {
		const widget = new WidgetInfo(json.id, json.type);
		widget.posX = json.posX ?? 0;
		widget.posY = json.posY ?? 0;
		widget.width = json.width ?? 300;
		widget.height = json.height ?? 300;
		widget.aspectRatio = json.aspectRatio;
		return widget;
	}

	// Method to convert the instance to JSON data
	toJSON() {
		return {
			id: this.id,
			posX: this.posX,
			posY: this.posY,
			width: this.width,
			height: this.height,
			aspectRatio: this.aspectRatio,
			type: this.type
		};
	}
}



// corners of a box
export class Corner {
	constructor(is_top, is_left) {
		this.is_top = is_top;
		this.is_left = is_left;
	}
	static all = Object.freeze({
		TOP_RIGHT: new Corner(true, false),
		BOTTOM_RIGHT: new Corner(false, false),
		BOTTOM_LEFT: new Corner(false, true),
		TOP_LEFT: new Corner(true, true)
	})
}

