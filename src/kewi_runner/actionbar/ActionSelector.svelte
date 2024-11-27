<script>
import Check from "lucide-svelte/icons/check";
import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
import { tick } from "svelte";
import * as Command from "$lib/components/ui/command/index.js";
import * as Popover from "$lib/components/ui/popover/index.js";
import { Button } from "$lib/components/ui/button/index.js";
import { cn } from "$lib/utils.js";

const frameworks = [
{
	value: "sveltekit",
	label: "SvelteKit"
},
{
	value: "next.js",
	label: "Next.js"
},
{
	value: "nuxt.js",
	label: "Nuxt.js"
},
{
	value: "remix",
	label: "Remix"
},
{
	value: "astro",
	label: "Astro"
}
];

let open = $state(false);
let value = $state("");
let triggerRef = $state(null);

const selectedValue = $derived(
frameworks.find((f) => f.value === value)?.label
);

// We want to refocus the trigger button when the user selects
// an item from the list so users can continue navigating the
// rest of the form with the keyboard.
function closeAndFocusTrigger() {
open = false;
tick().then(() => {
	triggerRef.focus();
});
}

// https://next.shadcn-svelte.com/docs/components/combobox

</script>

<div class="selectorcontainer">
	  <Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
		  {#snippet child({ props })}
			<Button
			  variant="outline"
			  class=""
			  {...props}
			  role="combobox"
			  aria-expanded={open}
			>
			  {selectedValue || "Select a Script"}
			  <ChevronsUpDown class="opacity-50" />
			</Button>
		  {/snippet}
		</Popover.Trigger>
		<Popover.Content class="p-0">
		  <Command.Root>
			<Command.List>
			  <Command.Empty>No framework found.</Command.Empty>
			  <Command.Group>
				{#each frameworks as framework}
				  <Command.Item
					value={framework.value}
					onSelect={() => {
					  value = framework.value;
					  closeAndFocusTrigger();
					}}
				  >
					<Check
					  class={cn(
						"ml-auto",
						value !== framework.value && "text-transparent"
					  )}
					/>
					{framework.label}
				  </Command.Item>
				{/each}
			  </Command.Group>
			</Command.List>
			<Command.Input placeholder="Search framework..." />
		  </Command.Root>
		</Popover.Content>
	  </Popover.Root>
</div>

<!-- <Command.Root class="max-w-[450px] rounded-lg border shadow-md">
<Command.Input placeholder="Select a thing to run" />
<Command.List>
	<Command.Empty>No results found.</Command.Empty>
	<Command.Group heading="Kewi Scripts">
	<Command.Item>Thing1</Command.Item>
	<Command.Item>Thing2</Command.Item>
	<Command.Item>Thing3</Command.Item>
	</Command.Group>
</Command.List>
</Command.Root> -->

<style lang="scss">

.selectorcontainer {
	padding: 20px;

	:global(& > button) {
		background-color: #1b1f27;
		width: 100%;
	}
}

</style>
			