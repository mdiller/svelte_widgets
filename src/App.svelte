<script>
import AssistantGui from './components/AssistantGui.svelte';
import WidgetContainer from './components/WidgetContainer.svelte';
import '@fortawesome/fontawesome-free/css/all.css';
import WebSocketManager from './lib/WebSocketManager.js';
import { onMount } from 'svelte';

const STARTING_GUI_DATA = {
	"is_done": false,
	"start_time": "2024-11-20T12:26:23.437668",
	"root_step": {
		"id": "Record Thought",
		"name": "Record Thought",
		"icon": "fas fa-lightbulb",
		"classes": [],
		"child_steps": [
			{
				"id": "Record Thought-0Listening",
				"name": "Listening",
				"icon": "fas fa-microphone",
				"classes": [],
				"child_steps": [],
				"gui_text": null
			},
			{
				"id": "Record Thought-1Transcribing",
				"name": "Transcribing",
				"icon": "fas fa-feather-pointed",
				"classes": [],
				"child_steps": [],
				"gui_text": "Testing, testing, one, two, three."
			},
			{
				"id": "Record Thought-2Function",
				"name": "WRITE_DOWN()",
				"icon": "fas fa-terminal",
				"classes": [
					"loading"
				],
				"child_steps": [],
				"gui_text": null
			}
		],
		"gui_text": null
	}
};


let gui_data = $state(STARTING_GUI_DATA);


function update(data) {
	// console.log("heres the data:")
	// console.dir(data);
	console.log("WEBSOCKET.update_gui");
	gui_data = data;
}

let websocketManager;
// Initialize WebSocket connection when the component is created
onMount(() => {
	websocketManager = new WebSocketManager('ws://localhost:8080/ws');
	websocketManager.connect();

	// Subscribe to `gui_data` events
	websocketManager.on("update_gui", update);

	// Cleanup on component destroy
	return () => {
		websocketManager.off("update_gui", update);
	};
});

</script>

<main>
	<!-- <WidgetContainer /> -->
	<AssistantGui gui_data={gui_data} />
</main>

<style>
</style>
