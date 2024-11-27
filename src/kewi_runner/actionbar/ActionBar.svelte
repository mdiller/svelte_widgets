<script>
import ActionBarButton from './ActionBarButton.svelte';
import ActionSelector from './ActionSelector.svelte';

</script>

<div class="actionbar">
	<div>
		<ActionBarButton />
		<ActionSelector />
	</div>
</div>

<style lang="scss">

div.actionbar {
	position: absolute;
	bottom: 0px;
	left: 0px;
	right: 0px;
	background-color: #1b1f27;

	& > div {
		width: 100%;
		height: 100%;
		position: relative;
	}
}

</style>
		