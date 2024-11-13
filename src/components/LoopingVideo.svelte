<script>

/** @type {{ url: string }} */
let { url } = $props();

let count = $state(0)
const increment = () => {
	count += 1
}
</script>

<video autoplay loop muted playsinline>
	<source src="{url}" type="video/webm">
	Your browser does not support the video tag.
</video>

<style>

video {
	width: 100%;
	height: 100%;
}
</style>