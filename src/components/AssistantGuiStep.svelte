<script>
import AssistantGuiStep from "./AssistantGuiStep.svelte";
/**
 * @typedef {Object} StepData
 * @property {string} id - The unique identifier for the step.
 * @property {string} name - The name of the step function.
 * @property {string} icon - The icon class for the step, typically a FontAwesome class.
 * @property {string[]} classes - An array of additional CSS classes for the step.
 * @property {StepData[]} child_steps - An array of child steps, each of which follows the StepData structure.
 * @property {?string} gui_text - Optional GUI text associated with the step (can be null).
 */

/** @type {{ step_data: StepData, nest_even: boolean }} */
let { 
	step_data,
	nest_even = false
} = $props();

let css_classes = $derived.by(() => {
	let result = step_data.classes.join(" ");
	if (nest_even) {
		result += " nest_even";
	}
	return result;
});

</script>

<div id="{step_data.id}" class="{css_classes}">
	<span>
		{#if step_data.icon}
			<i class="{step_data.icon}"></i>
		{/if}
		{step_data.name}
	</span>
	<span class="loadingspinner">
		<i class="fas fa-spinner"></i>
	</span>
	{#if step_data.gui_text}
		<div id="{step_data.id}_text" class="step_text">{step_data.gui_text}</div>
	{/if}
	{#each step_data.child_steps as child_data}
		<AssistantGuiStep step_data={child_data} nest_even={!nest_even} />
	{/each}
</div>

<style>

div {
	/* margin: 0px !important;
	border-radius: var(--border-radius) !important;
	height: var(--contents-height);
	border: 1px var(--color1) solid; */
	text-align: left;

	background-color: var(--color3);

}
div.nest_even {
	background-color: var(--color2);
}

div {
	position: relative;
	border-radius: 6px;
	/* border: 1px solid var(--color2); */
	margin: 5px;
	padding: 2px;
	transition: all 0.5s;
}

span:first-child {
	padding: 10px;
	padding-left: 2px;
	font-size: 14px;
	line-height: var(--bar-height);
}

span:first-child i {
	color: var(--color-highlight);
	text-align: center;
	width: 24px;
}

div.new {
	animation: 0.5s newBarAnim forwards;
}
@keyframes newBarAnim {
	from { opacity: 0; }
	to { opacity: 1; }
}


.loading span:first-child i {
	color: white;
}

.loadingspinner {
	display: none;
}

span.loadingspinner {
	position: absolute;
	right: 8px;
	top: 2px;
	line-height: var(--bar-height);
	float: right;
	animation: rotate 2s linear infinite;
}
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.error {
	background: #dd431c !important;
}

.loading {
	background: var(--color-highlight) !important;
}
.loading .loadingspinner {
	display: inline-block;
}

.step_text {
	padding: 8px;
	color: grey;
	font-size: 12px;
}

</style>