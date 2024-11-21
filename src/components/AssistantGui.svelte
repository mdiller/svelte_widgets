<script>
    import AssistantGlasses from "./AssistantGlasses.svelte";
import AssistantGuiStep from "./AssistantGuiStep.svelte";

let { 
	gui_data,
} = $props();

</script>

<div id="guicontainer">
	<div id="container">
		<!-- <i class="fab fa-facebook"></i> -->
		<div id="glassesholder">
			<AssistantGlasses />
		</div>
		<div id="header" >
		</div>
		<div id="content2">
			<!-- <img src="http://localhost:8080/files/temp.png" /> -->
		</div>
		<div id="attachment">
			<!-- <img src="http://localhost:8080/files/temp.png" /> -->
		</div>
		<div id="contents">
			{#if !gui_data.dashboard_data}
				<AssistantGuiStep step_data={gui_data.root_step} nest_even={false} />
			{:else}
				<div id="dashboardstuff">
					<div>{gui_data.dashboard_data.title}</div>
					<div>
						{@html gui_data.dashboard_data.content}
						{#if gui_data.image_url}
						<div class="attachment">
							<img src="{gui_data.image_url}" alt="image here" />
						</div>
						{/if}
					</div>
					<div class="statusbar" style="background-color: {gui_data.dashboard_data.status.color}">{@html gui_data.dashboard_data.status.html}</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">

:root {
	--window-margin: 20px;
	--window-width: 280px;
	--window-height: 450px;
	--window-fade-time: 2s;

	--window-fade-time-wait: 1s;
	--window-fade-time-fade: calc(var(--window-fade-time) - var(--window-fade-time-wait));

	--contents-height: calc(var(--window-height) - 100px);

	--border-radius: 10px;
	--main-padding: 16px;
	--outer-border: 8px;

	--color0: #13161b;
	--color1: #1b1f27;
	--color2: #212630;
	--color3: #282d39;
	--color-highlight: #1369ee;

	--bar-height: 28px;
}

#guicontainer {
	position: fixed;
	top: 40px;
	right: 0px;

	background-color: rgba(0, 0, 0, 0);
	width: var(--window-width);
	height: var(--window-height);
	/* border: 1px solid red; */
	margin: 0px;
	padding: var(--main-padding);

	-ms-overflow-style: none;
	scrollbar-width: none;
}

/* body {
	opacity: 0;
	animation: 0.3s fadeInBody forwards;
}
@keyframes fadeInBody {
	to { opacity: 1; }
} */

#container {
	position: relative;
	background-color: var(--color0);
	padding: var(--outer-border);
	/* border: 2px solid var(--color1); */
	box-shadow: 0px 0px 20px 2px var(--color1);
	border-radius: calc(var(--border-radius) * 1.75);
}

#container:not(.idle) {
	animation: fadeIn 0.25s forwards;
}

#container.done {
	animation: fadeOut var(--window-fade-time-fade) ease var(--window-fade-time-wait) forwards;
}
#container:not(.done) {
	opacity: 1;
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

#header {
	height: 0px;
	/* margin-top: calc(0px - var(--outer-border));
	padding: 12px;
	text-align: center;
	font-weight: bold;
	font-size: 18px;
	color: #d0d0d3; */
}

#glassesholder {
	position: absolute;
	left: 50%;
	top: 0px;
	width: 200px;
	transform: translate(-50%, -95%);
}

#dashboardstuff {
	& > div:first-child {
		font-size: 40px;
		font-weight: 200px;
		
	}
	& > div:nth-child(2) {
		background-color: var(--color2);
		padding: 10px;
		border-radius: 8px;
		margin-bottom: 30px;

		:global(span) {
			font-weight: bold;
		}
	}

	
	.statusbar {
		position: absolute;
		bottom: 1px;
		left: 0px;
		right: 1px;
		padding: 3px 12px;
		border-radius: 0 0 calc(var(--border-radius) * 1.75) calc(var(--border-radius) * 1.75);
		background-color: var(--color1);
		transition: background-color 0.5s;
	}

	.statusbar :global(span:first-child) {
		float: left;
		font-weight:700;
	}

	.statusbar :global(span:last-child) {
		float: right;
		color: grey;
	}


	.attachment img {
		// margin: auto;
		max-height: 150px;
		max-width: 150px;
		margin-bottom: 8px;
		border-radius: 8px;
	}
	.attachment {
		text-align: center;
	}
}


// #content2 {
// 	color: grey;
// 	margin: auto;
// 	text-align: center;
// 	width: 100%;
// 	overflow: hidden;
// 	white-space: nowrap;

// 	span {
// 		color: grey;
// 		font-weight: bold;
// 		text-decoration: underline;
// 	}
// }

</style>