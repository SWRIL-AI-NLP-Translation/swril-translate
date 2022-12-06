<script lang="ts">
	import { COLORS } from "$lib/styles/colors";
	import Logout from "./icons/logout.svelte";
	import Settings from "./icons/settings.svelte";

	let signInDisplay = false;

</script>

<div>
	<div class="settingsButton">
		<Settings on:click={()=>{console.log("hi"); signInDisplay = !signInDisplay}} color={COLORS.darkGrey}/>
	</div>
	<button class="signInButton" style={`display: ${signInDisplay?'flex':'none'}`}>
		<Logout color={COLORS.darkGrey}/>
		<p>Sign in</p>
	</button>
</div>

<style lang="scss">
	.settingsButton {
		height: 2rem;
		width: 2rem;
		cursor: pointer;
	}
	.signInButton {
		cursor: pointer;
		height: 2rem;
		width: 6rem;
		background-color: white;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		p {
			font-size: 1rem;
			text-align: center;
			color: color('_darkGrey');
			margin: 0 0.5rem;
		}
	}
</style>