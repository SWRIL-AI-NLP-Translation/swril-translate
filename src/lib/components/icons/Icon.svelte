<script lang="ts">
	import { COLORS } from '$lib/styles/colors';
	import Account from './account.svelte';
	import Logout from './logout.svelte';
	import Settings from './settings.svelte';
	import Star from './star.svelte';
	import Swap from './swap.svelte';
	const icons = [
		"logout",
		"star",
		"settings",
		"swap",
		"account"
	]
	export let color = COLORS.font;
	export let height: string|undefined = undefined
	export let width: string|undefined = undefined
	export let icon: typeof icons[number] 
</script>

<div style={`height: ${height}; width: ${width}`}>
	{#if icon == "logout"}
		<Logout color={color}/>
	{:else if icon == "star"}
		<Star color={color}/>
	{:else if icon == "settings"}
		<Settings color={color}/>
	{:else if icon == "swap"}
		<Swap color={color}/>
	{:else if icon == "account"}
		<Account color={color}/>
	{/if}
</div>
