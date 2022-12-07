<script lang="ts">
	import { COLORS } from '$lib/styles/colors';
	import { graphql } from '$lib/data/graphql';
	import Icon from '$lib/components/icons/Icon.svelte';
</script>

<article>
	<header>
		<h1>Translate</h1>
	</header>
	<section class="intro">
		<h3>Forgot your password?</h3>
		<p>That sucks. Especially since we haven't implemented this yet.</p>
	</section>
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 25rem;
		width: 100%;
		header {
			background-color: color('secondary');
			display:flex;
			justify-content: center;
			align-items: center;
			width: calc(100% - 2rem);
			padding: 1rem 1rem 1rem;
			h1 {
				font-size: 2rem;
				text-align: center;
				color: color('primary')
			}
		}
		.intro {
			width: 100%;
			h3 {
				font-size: 1.5rem;
				text-align: left;
				font-weight: 500;
			}
			p {
				font-size: 1rem;
				text-align: left;
				font-weight: 500;
				color: color('swr_green');
			}
		}
	}
</style>
