<script>
import { setContext, onMount, onDestroy } from 'svelte';
import { WidgetInfo } from '../lib/WidgetInfo.svelte.js';
import { WidgetEditor } from '../lib/WidgetEditor.svelte.js';
import { WidgetProvider } from '../lib/WidgetProvider.svelte.js';
import Widget from './Widget.svelte';
import LoopingVideo from './LoopingVideo.svelte';
import Glasses from './Glasses.svelte';

import { listen } from '@tauri-apps/api/event';



const componentMap = {
	video: LoopingVideo,
	glasses: Glasses
}

let widgetProvider = new WidgetProvider();
let widgetEditor = new WidgetEditor(widgetProvider);

// Set the widgetEditor instance in the context for global access
setContext('widgetEditor', widgetEditor);

let cssClass = $derived(widgetEditor.editMode ? "editing" : "")

async function toggleEditMode() {
	widgetEditor.editMode = !widgetEditor.editMode;
	if (!widgetEditor.editMode) {
		await widgetProvider.save();
	}
}

function toggleAspectLocked() {
	widgetEditor.aspectRatioLocked = !widgetEditor.aspectRatioLocked;
}

async function initWidgetStuff() {
	await widgetProvider.load()
}

async function addWidget() {
	widgetProvider.add("example_widget_NEW", "glasses");
	await widgetProvider.save()
}

async function saveWidgets() {
	await widgetProvider.save()
}

let componentName = "video";

let widgetList = $derived(widgetProvider.widgets);

function handleKeydown(event) {
	if (event.key === 'Delete') {
		if (widgetEditor.editMode == true && widgetEditor.activeWidget) {
			widgetProvider.remove(widgetEditor.activeWidget);
			widgetEditor.activeWidget = null;
		}
	}
}
onMount(async () => {
	await initWidgetStuff();

	// widgetEditor.initializeDragListeners();
	// window.addEventListener('keydown', handleKeydown);

	// return () => {
	// 	widgetEditor.removeDragListeners();
	// 	window.removeEventListener('keydown', handleKeydown);
	// }
});
</script>

<!-- svelte-ignore slot_element_deprecated -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="widgetcontainer {cssClass}">
	<!-- svelte-ignore event_directive_deprecated -->
	<div class="buttonholder">
		<button onclick={toggleEditMode}>
			Edit
		</button>
		<button onclick={initWidgetStuff}>
			Init
		</button>
		<button onclick={addWidget}>
			Add
		</button>
		<button onclick={saveWidgets}>
			Save
		</button>
	</div>
	{#each widgetList as widget}
		{@const CurrentComponent = componentMap[widget.type]}
		<Widget widget={widget}>
			{#if CurrentComponent}
				<CurrentComponent />
			{:else}
				<p>No component found for key "{widget.type}".</p>
			{/if}
		</Widget>
	{/each}
</div>

<style>

.buttonholder {
	position: fixed;
	bottom: 0px;
	left: 0px;
}

</style>
	