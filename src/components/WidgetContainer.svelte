<script>
import { setContext, onMount, onDestroy } from 'svelte';
import { WidgetInfo } from '../lib/WidgetInfo.svelte.js';
import { WidgetEditor } from '../lib/WidgetEditor.svelte.js';
import { WidgetProvider } from '../lib/WidgetProvider.svelte.js';
import Widget from './Widget.svelte';
import LoopingVideo from './LoopingVideo.svelte';
import Glasses from './Glasses.svelte';

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

let componentName = "video";

let widgetList = $state([]);

onMount(async () => {
	widgetEditor.initializeDragListeners();
	await widgetProvider.load()
	widgetList = widgetProvider.widgets;
	console.log(`${widgetList.length} widgets loaded!`);
	console.dir(widgetList[0].type);
});

onDestroy(() => {
	widgetEditor.removeDragListeners();
});
</script>

<!-- svelte-ignore slot_element_deprecated -->
<div class="widgetcontainer {cssClass}">
	<!-- svelte-ignore event_directive_deprecated -->
	<button onclick={toggleEditMode}>
		Toggle Edit Mode
	</button>
	<button onclick={toggleAspectLocked}>
		Lock/Unlock Aspect Ratio
	</button>
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


</style>
	