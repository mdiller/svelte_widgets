<script>
import * as Command from "$lib/components/ui/command/index.js";
import * as Select from "$lib/components/ui/select/index.js";

// https://next.shadcn-svelte.com/docs/components/command

</script>

<div class="selectorcontainer">
	<Select.Root type="single">
		<Select.Trigger class=""></Select.Trigger>
		<Select.Content>
			<Select.Item value="light">Light</Select.Item>
			<Select.Item value="dark">Dark</Select.Item>
			<Select.Item value="system">System</Select.Item>
		</Select.Content>
	</Select.Root>
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
}

</style>
			