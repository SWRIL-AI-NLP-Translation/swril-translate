<script lang="ts">
	import { goto } from "$app/navigation";
	import { COLORS } from "$lib/styles/colors";
	import Icon from "./icons/Icon.svelte";
	import Logout from "./icons/logout.svelte";
	import Settings from "./icons/settings.svelte";

	let signInDisplay = false;

</script>

<div class="container">
	<div class="settingsButton" on:click={()=>{console.log("hi"); signInDisplay = !signInDisplay}} >
		<Icon icon="settings" color={COLORS.darkGrey}/>
	</div>
	<button 
		class="signInButton" 
		style={`display: ${signInDisplay?'flex':'none'}`}
		on:click={()=>{goto('/login')}}
	>
		<Icon icon="logout" height={'1.5rem'} width={'1.5rem'} color={COLORS.darkGrey}/>
		<p>Sign in</p>
	</button>
</div>

<style lang="scss">
	.container {
		position: relative
	}
	.settingsButton {
		height: 2rem;
		width: 2rem;
		cursor: pointer;
	}
	.signInButton {
		position: absolute;
		cursor: pointer;
		right: 0;
		max-height: 2rem;
		width: 7rem;
		background-color: white;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		padding: 0.3rem;
		p {
			font-size: 1rem;
			text-align: center;
			color: color('_darkGrey');
			margin: 0 0.5rem;
		}
	}
</style>