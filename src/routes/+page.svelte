<script lang="ts">
	import { goto } from '$app/navigation';
	import Settings from '$lib/components/icons/settings.svelte';
	import { COLORS } from '$lib/styles/colors';
	import Star from '$lib/components/icons/star.svelte';
	import Swap from '$lib/components/icons/swap.svelte';
	import Upload from '$lib/components/icons/upload.svelte';
	import { graphql } from '$lib/data/graphql';
	import { TRANSLATION } from '$lib/data/queries/translate';

	let fromLanguage = 'Mandarin';
	let toLanguage = 'English';

	let translation = '';

	let tryTranslate = async () => {
		translation = '';
		const textInput:HTMLInputElement|null = document.querySelector("#textInput");
		let text;
		if (textInput) text = textInput.value;
		else return
		if (text.length === 0) return
		try {
			const res = await graphql.request(TRANSLATION, {
				data: {
					fromLanguage,
					toLanguage,
					text,
				},
			})
			console.log(res)
			const data = res.translation
			if (!data) {
				console.error(res.errors)
			} else {
				translation = data.text
			}
		} catch (e) {
			console.error(e)
		}
	}
</script>

<article>
	<header>
		<div>
			<Star color={COLORS.darkGrey}/>
		</div>
		<h1>Translate</h1>
		<div>
			<Settings color={COLORS.darkGrey}/>
		</div>
	</header>
	<section class="languageSelect">
		<div class="fromLanguage">
			<p class="languageName">{fromLanguage}</p>
		</div>
		<div class="swapIcon">
			<Swap color={COLORS.darkGrey}/>
		</div>
		<div class="toLanguage">
			<p class="languageName">{toLanguage}</p>
		</div>
	</section>

	<section class="textArea">
		<textarea id="textInput" placeholder="Enter text here..." on:change={() => tryTranslate()}></textarea>
		<div class="document">
			<button on:click={() => {}}>
				<div>
					<Upload color={COLORS.primary}/>
				</div>
				<p>Document</p>
			</button>
		</div>
	</section>

</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		* {
			max-width: 25rem;
		}
		header {
			display:flex;
			justify-content: space-between;
			align-items: center;
			width: calc(100% - 2rem);
			margin: 1rem 1rem 1rem;
			h1 {
				font-size: 2rem;
				text-align: center;
				color: color('primary')
			}
			div {
				height: 2rem;
				width: 2rem;
			}
		}
		.languageSelect {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			.swapIcon {
				height: 4rem;
				width: 4rem;
				margin: 0 1rem;
			}
			.fromLanguage, .toLanguage {
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 1rem;
				width: 100%;
				height: 100%;
				.languageName {
					font-size: 1.5rem;
					text-align: center;
					color: white
				}
			}
			.fromLanguage {
				background-color: color('swr_green');
			}
			.toLanguage {
				background-color: color('swr_blue');
			}
		}
		.textArea {
			width: 100%;
			textarea {
				border: none;
				border-radius: 0.5rem 0.5rem 0 0;
				padding: 0.6rem;
				width: 100%;
				min-height: 6rem;
				resize:vertical;
				font-size: 1.3rem;
			}
			.document {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				background-color: white;
				border-top: 1px solid color('_darkGrey');
				padding: 0.5rem;
				border-radius: 0 0 0.5rem 0.5rem;
				button {
					display: flex;
					align-items: center;
					justify-content: center;
					border: none;
					background-color: white;
					div {
						height: 2rem;
						width: 2rem;
					}
				}
			}
		}
	}
</style>