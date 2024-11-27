<script>
import { invoke } from "@tauri-apps/api/core";
// import App from "../App.svelte";
import RunnerMain from "../kewi_runner/RunnerMain.svelte";

</script>

<main>
  <!-- <App /> -->
  <RunnerMain />
</main>

<style>

main {
  background-color: #0f0f0f;

  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
}

</style>
