<script>

let isPressed = $state(false);
function handleMouseDown() {
	isPressed = true;
}

function handleMouseUp() {
	isPressed = false;
}


</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<div class="actionbuttoncontainer">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<button
		class:pressed="{isPressed}"
		onmousedown={handleMouseDown}
		onmouseup={handleMouseUp}
		onmouseleave={handleMouseUp}>
		<div class="glowthing"><div></div></div>
		<div class="glowthing"><div></div></div>
	</button>
</div>

<style lang="scss">

:root {
	--button-size: 150px;
	--glow-color: #58a6ff;
	--glow-color2: #0a8fff;
	--glow-color3: #58e0ff;
}

.actionbuttoncontainer {
	position: absolute;
	top: 0%;
	left: 50%;
	width: var(--button-size);
	height: var(--button-size);
	transform: translate(-50%, -90%);

	& > button {
		width: var(--button-size);
		height: var(--button-size);
		border-radius: var(--button-size);
		background-color: #AAAAAA;
		border: 6px solid #15181e;
		transition: 0.25s all;

		.glowthing {
			opacity: 0;
			transition: 0.25s opacity;
		}

		&.pressed {
			background-color: var(--glow-color);

			.glowthing {
				z-index: -1;
				position: absolute;
				top: 0px;
				left: 0px;
				width: calc(var(--button-size));
				height: var(--button-size);
				opacity: 1;
				animation: glow-rotate 4s linear infinite;
				& > div {
					position: absolute;
					top: 0px;
					left: 0px;
					width: calc(var(--button-size));
					height: var(--button-size);
					border-radius: var(--button-size);
					opacity: 1;
					box-shadow: 0px 0px 20px 5px var(--glow-color2);
					animation: glow-scale 3s ease-in-out infinite;
				}
				&:nth-child(2) {
					animation: glow-rotate 5s linear infinite;
					& > div {
						box-shadow: 0px 0px 20px 5px var(--glow-color3);
						animation: glow-scale 2.5s ease-in-out infinite;
						animation-delay: -0.5s;
					}
				}
			}
		}
	}
}

@keyframes glow-scale {
	0% {
		transform: scale(1, 0.95);
	}
	50% {
		transform: scale(0.95, 1);
	}
	100% {
		transform: scale(1, 0.95);
	}
}

@keyframes glow-rotate {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
}



</style>
		