<script lang="ts">
	import { goto } from '$app/navigation';
	import { COLORS } from '$lib/styles/colors';
	import Swap from '$lib/components/icons/swap.svelte';
	import Upload from '$lib/components/icons/upload.svelte';
	import { graphql } from '$lib/data/graphql';
	import { TRANSLATION } from '$lib/data/queries/translate';
	import SettingsMenu from '$lib/components/SettingsMenu.svelte';
	import { languages } from '$lib/types/languages';
	import type { HomeData } from './+page';
	import Icon from '$lib/components/icons/Icon.svelte';
	import { SAVE_TRANSLATION } from '$lib/data/mutations/saveTranslation';
	import SavedTranslationGrid from '$lib/components/SavedTranslationGrid.svelte';
	export let data: HomeData;

	let fromLanguage = 'English';
	let toLanguage = 'French';

	$: translation = '';

	let tryTranslate = async () => {
		const textInput:HTMLInputElement|null = document.querySelector("#textInput");
		const fromLanguageInput:HTMLInputElement|null = document.querySelector("#fromLanguageInput");
		const toLanguageInput:HTMLInputElement|null = document.querySelector("#toLanguageInput");

		let text;
		if (textInput && toLanguageInput && fromLanguageInput) {
			text = textInput.value;
			fromLanguage = fromLanguageInput.value;
			toLanguage = toLanguageInput.value;
		}
		else return
		if (text.length === 0) {
			translation = ''
			return
		}
		try {
			const res = await graphql.request(TRANSLATION, {
				data: {
					fromLanguage,
					toLanguage,
					text,
				},
			})
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
	const trySaveTranslation = async () => {
		if (!data.user) {
			alert('You must be logged in to save translations')
			return
		}
		if (translation.length === 0) return
		const textInput:HTMLInputElement|null = document.querySelector("#textInput");
		const fromLanguageInput:HTMLInputElement|null = document.querySelector("#fromLanguageInput");
		const toLanguageInput:HTMLInputElement|null = document.querySelector("#toLanguageInput");
		let text;
		if (textInput && toLanguageInput && fromLanguageInput) {
			text = textInput.value;
			fromLanguage = fromLanguageInput.value;
			toLanguage = toLanguageInput.value;
		}
		else return
		if (text.length === 0) return
		try {
			const res = await graphql.request(SAVE_TRANSLATION, {
				data: {
					to_text: translation,
					from_language: fromLanguage,
					to_language: toLanguage,
					from_text: text,
				},
			})
			const saveTranslation = res.saveTranslation
			if (!saveTranslation) {
				console.error(res.errors)
			} else {
				if (data?.user) {
					data.user.translations = [...data.user.translations, saveTranslation]
					alert('Saved translation to your account')
				} else {
					alert('You must be logged in to save translations')
				}
			}
		} catch (e) {
			console.error(e)
		}
	}
	const swap = () => {
		const fromLanguageInput:HTMLInputElement|null = document.querySelector("#fromLanguageInput");
		const toLanguageInput:HTMLInputElement|null = document.querySelector("#toLanguageInput");
		if (fromLanguageInput && toLanguageInput) {
			const temp = fromLanguageInput.value;
			fromLanguageInput.value = toLanguageInput.value;
			toLanguageInput.value = temp;
			translation = ''
		}
	}
</script>

<article>
	<header>
		<button on:click={trySaveTranslation}>
			<Icon icon="star" width='2rem' height='2rem' color={COLORS.darkGrey}/>
		</button>
		<h1>Translate</h1>
		<SettingsMenu user={data.user} />
	</header>
	<section class="languageSelect">
		<select value={fromLanguage} class="fromLanguage" id="fromLanguageInput" on:change={tryTranslate}>
			{#each languages as language}
				<option value={language}>{language}</option>
			{/each}
		</select>
		<button 
			class="swapIcon"
			on:click={swap}
		>
			<Swap color={COLORS.darkGrey}/>
		</button>
		<select value={toLanguage} class="toLanguage" id="toLanguageInput"  on:change={tryTranslate}>
			{#each languages as language}
				<option value={language}>{language}</option>
			{/each}
			<!-- <p class="languageName">{toLanguage}</p> -->
		</select>
	</section>

	<section class="textArea">
		<textarea 
			id="textInput" 
			placeholder="Enter text here..." 
			on:keydown={(e) => {if (e.key === 'Enter') tryTranslate()}}
			on:focusout={tryTranslate}
			on:change={() => {translation = ''}}
		></textarea>
		<textarea 
			id="textOutput" 
			disabled
			placeholder="Hit enter to translate" 
			value={translation}
		></textarea>
		<div class="document">
			<button on:click={() => {goto('/upload')}}>
				<div>
					<Upload color={COLORS.primary}/>
				</div>
				<p>Upload Document</p>
			</button>
		</div>
	</section>

	{#if data?.user}
		<section class="previousTranslations">
			<h5>Previous translations</h5>
			<SavedTranslationGrid translations={data.user.translations}/>
		</section>
	{/if}
	

</article>

<style lang="scss">
	button {
		background-color: transparent;
		border: none;
		outline: none;
	}
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 25rem;
		header {
			display:flex;
			justify-content: space-between;
			background-color: color('secondary');
			align-items: center;
			width: calc(100% - 2rem);
			padding: 1rem 1rem 1rem;
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
				// padding: 1rem;
				border-radius: 50%;
				margin: 0 1rem;
				transition: rotate 0.4s ease-in-out;
				&:hover {
					rotate: 180deg;
				}
			}
			.fromLanguage, .toLanguage {
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 1rem;
				font-size: 1.5rem;
				text-align: center;
				border: none;
				color: white;
				width: 100%;
				height: 100%;
				border: 0.2rem solid transparent;
				transition: border-color 0.2s ease-in-out;
			}
			.fromLanguage {
				background-color: color('swr_green');
				&:hover {
					border-color: color('swr_blue');
				}
			}
			.toLanguage {
				background-color: color('swr_blue');
				&:hover {
					border-color: color('swr_green');
				}
			}
		}
		.textArea {
			width: 100%;
			#textInput {
				border: none;
				border-radius: 0.5rem 0.5rem 0 0;
				padding: 0.6rem;
				width: 100%;
				min-height: 6rem;
				resize:vertical;
				font-size: 1.3rem;
			}
			#textOutput {
				border: none;
				border-top: 1px solid color('_darkGrey');
				padding: 0.6rem;
				width: 100%;
				font-size: 1.3rem;
				background-color: white;
				resize: none;
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
					border: 0.2rem solid transparent;
					// padding: 0.3rem 0.5rem;
					border-radius: 0.5rem;
					transition: border-color 0.2s ease-in-out;
					// box-sizing:border-box;
					&:hover {
						border-color: color('swr_blue');
					}
					div {
						height: 2rem;
						width: 2rem;
					}
					p {
						margin: 0.3rem 0.5rem;
						font-size: 1.2rem;
						// color: black;
						font-weight: bold;
					}
				}
			}
		}
		.previousTranslations {
			h5 {
				margin: 1rem 0 0.5rem;
				font-size: 1.5rem;
				text-align: center;
				color: color('_darkGrey')
			}
		}
	}
</style>
