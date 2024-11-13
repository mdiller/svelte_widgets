<script>
import { getContext, setContext } from 'svelte';
import { WidgetInfo, Corner } from '../lib/WidgetInfo.svelte.js';

/** @type {{ widget: WidgetInfo }} */
let { widget } = $props();

// Use the globally available widgetEditor instance
let editor = getContext('widgetEditor');

setContext('widgetInfo', widget);

// let posX = $state(0);
// let posY = $state(0);
// let width = $state(300); // New width state
// let height = $state(300); // New height state

function handleMouseDown(event) {
	if (!editor.editMode) return;
	event.stopPropagation(); // Prevent other propogation
	editor.startDragging(widget, event.clientX, event.clientY);
}

function handleResizeMouseDown(event, corner) {
	if (!editor.editMode) return;
	event.stopPropagation(); // Prevent drag from triggering
	editor.startResizing(widget, event.clientX, event.clientY, corner);
}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore slot_element_deprecated -->
<div
	class="widget"
	onmousedown={handleMouseDown}
	style="left: {widget.posX}px; top: {widget.posY}px; width: {widget.width}px; height: {widget.height}px;"
>
	<!-- actual content -->
	<slot></slot>
	<!-- <div class="card">
		<div class="centeredtext">
			Widget '{widget.id}'
		</div>
	</div> -->
	<!-- editing handlers -->
	<div class="move-handle" onmousedown={handleMouseDown}></div>
	<div class="resize-handle top right" onmousedown={event => handleResizeMouseDown(event, Corner.all.TOP_RIGHT)}></div>
	<div class="resize-handle bottom right" onmousedown={event => handleResizeMouseDown(event, Corner.all.BOTTOM_RIGHT)}></div>
	<div class="resize-handle bottom left" onmousedown={event => handleResizeMouseDown(event, Corner.all.BOTTOM_LEFT)}></div>
	<div class="resize-handle top left" onmousedown={event => handleResizeMouseDown(event, Corner.all.TOP_LEFT)}></div>
	
</div>

<style lang="scss">
.widget {
	position: fixed;
}

.centeredtext {
	position: absolute;
	font-weight: bold;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.move-handle,
.resize-handle {
	position: absolute;
	display: none;
	cursor: grab;

	:global(.editing) & {
		display: block;
	}
}

.move-handle {
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.2);
	border: 1px solid red; 
	
	&:active {
		cursor: grabbing;
	}
}

.resize-handle {
	width: 16px;
	height: 16px;
	border-radius: 8px;
	background-color: red;
	cursor: nwse-resize;

	&.bottom {
		bottom: -8px;
	}
	&.top {
		top: -8px;
	}
	&.right {
		right: -8px;
	}
	&.left {
		left: -8px;
	}
	&.top.right,
	&.bottom.left {
		cursor: nesw-resize;
	}
}
</style>
