<script>
import '@fortawesome/fontawesome-free/css/all.css';
import '../shadcn_app.css'
import '../app.css'
import { onMount } from 'svelte';
import ActionBar from './actionbar/ActionBar.svelte';

</script>

<main>
	<div>
		<div> stuff here  </div>
		<ActionBar />
	</div>
</main>

<style>

main {
	background-color: #282d39;
	width: 408px;
	height: 815px;
	right: 50%;
	top: 50%;
	transform: translate(50%,-50%);
	position: fixed;
}

main > div {
	position: relative;
	width: 100%;
	height: 100%;
}

/* main {
	right: 20px;
	top: 20px;
	transform: none;
} */

@media only screen and (max-width: 768px) {
	main {
		right: 0px;
		top: 0px;
		width: 100vw;
		height: 100vh; /* Example style for mobile */
		transform: none;
	}
}

</style>
	