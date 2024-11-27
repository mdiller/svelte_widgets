import { WidgetInfo, Corner } from '../lib/WidgetInfo.svelte.js';

export class WidgetEditor {
	editMode = $state(true);
	aspectRatioLocked = $state(false);
	dragState = $state({
		initialWidth: 0,
		initialHeight: 0,
		offsetX: 0, // Cursor offset from drag point
		offsetY: 0, // Cursor offset from drag point
		startX: 0, // Start of the drag1
		startY: 0, // Start of the drag1
		isResizing: false, // New flag to track if resizing
		isDragging: false, // New flag to track if moving
		corner: Corner.all.TOP_RIGHT
	});
	/** @type { WidgetInfo } */
	activeWidget = $state(null);

	constructor(provider) {
		this.widgetProvider = provider;
	}

	toggleEditMode() {
		this.editMode = !this.editMode;
	}

	// Toggle aspect ratio lock
	toggleAspectRatioLock() {
		this.aspectRatioLocked = !this.aspectRatioLocked;
	}

	focusWidget(widget) {
		if (this.activeWidget && this.activeWidget.isActive) {
			this.activeWidget.isActive = false;
		}
		this.activeWidget = widget;
		if (this.activeWidget && !this.activeWidget.isActive) {
			this.activeWidget.isActive = true;
		}
	}

	startDragging(widget, clientX, clientY) {
		this.focusWidget(widget);
		this.dragState = {
			...this.dragState,
			offsetX: clientX - widget.posX,
			offsetY: clientY - widget.posY,
			startX: clientX,
			startY: clientY,
			isResizing: false,
			isDragging: true,
		};
	}

	startResizing(widget, clientX, clientY, corner) {
		this.focusWidget(widget);
		let offsetX = clientX - (corner.is_left ? widget.posX : widget.posX + widget.width);
		let offsetY = clientY - (corner.is_top ? widget.posY : widget.posY + widget.height);
		this.dragState = {
			...this.dragState,
			initialWidth: widget.width,
			initialHeight: widget.height,
			offsetX: offsetX,
			offsetY: offsetY,
			startX: clientX,
			startY: clientY,
			isResizing: true,
			isDragging: false,
			corner: corner
		};
	}

	handleMouseMove(event) {
		if (this.activeWidget != null) {
			if (this.dragState.isResizing) {
				let mouseX = Math.max(Math.min((event.clientX - this.dragState.offsetX), window.innerWidth), 0);
				let mouseY = Math.max(Math.min((event.clientY - this.dragState.offsetY), window.innerHeight), 0);

				let deltaX = mouseX - (this.dragState.startX - this.dragState.offsetX);
				let deltaY = mouseY - (this.dragState.startY - this.dragState.offsetY);

				if (this.dragState.corner.is_left) {
					deltaX = 0 - deltaX;
				}
				if (this.dragState.corner.is_top) {
					deltaY = 0 - deltaY;
				}

				let newWidth = this.dragState.initialWidth + deltaX;
				let newHeight = this.dragState.initialHeight + deltaY;

				if (this.aspectRatioLocked || this.activeWidget.aspectRatio != null) {
					let aspectRatio = this.dragState.initialWidth / this.dragState.initialHeight;
					if (this.activeWidget.aspectRatio != null) {
						aspectRatio = this.activeWidget.aspectRatio;
					}
					newHeight = newWidth / aspectRatio;
				} // all this aspect ratio and min width/height stuff aint perfect
				newWidth = Math.max(50, newWidth);
				newHeight = Math.max(50, newHeight);

				if (this.dragState.corner.is_left) {
					this.activeWidget.posX -= (newWidth - this.activeWidget.width);
				}
				if (this.dragState.corner.is_top) {
					this.activeWidget.posY -= (newHeight - this.activeWidget.height);
				}
				
				this.activeWidget.width = newWidth;
				this.activeWidget.height = newHeight;
			}
			if (this.dragState.isDragging) {
				const maxX = window.innerWidth - this.activeWidget.width;
				const maxY = window.innerHeight - this.activeWidget.height;

				const newX = Math.min(maxX, Math.max(0, event.clientX - this.dragState.offsetX));
				const newY = Math.min(maxY, Math.max(0, event.clientY - this.dragState.offsetY));

				this.activeWidget.posX = newX;
				this.activeWidget.posY = newY;
			}
		}
	}

	handleMouseUp() {
		this.dragState = { ...this.dragState, isResizing: false, isDragging: false };
	}

	initializeDragListeners() {
		this.mouseMoveListener = this.handleMouseMove.bind(this);
		this.mouseUpListener = this.handleMouseUp.bind(this);
		window.addEventListener('mousemove', this.mouseMoveListener);
		window.addEventListener('mouseup', this.mouseUpListener);
	}

	removeDragListeners() {
		window.removeEventListener('mousemove', this.mouseMoveListener);
		window.removeEventListener('mouseup', this.mouseUpListener);
	}
}
