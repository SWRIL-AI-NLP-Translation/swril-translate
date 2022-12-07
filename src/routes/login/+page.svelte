<script lang="ts">
	import { COLORS } from '$lib/styles/colors';
	import { graphql } from '$lib/data/graphql';
	import Icon from '$lib/components/icons/Icon.svelte';
	import { LOGIN } from '$lib/data/mutations/login';
	import { Cookies } from '$lib/modules/cookies';
	import { goto } from '$app/navigation';

	let submitEnabled = true;


	let tryLogin = async () => {
		submitEnabled = false;
		const emailInput:HTMLInputElement|null = document.querySelector("#emailInput");
		const passwordInput:HTMLInputElement|null = document.querySelector("#passwordInput");

		let [email, password] = ['', ''];
		if ( emailInput && passwordInput) {
			email = emailInput.value;
			password = passwordInput.value;
			if (email === '' || password === '') {
				alert("Please fill out all fields");
				return;
			}
		}
		else return
		try {
			const res = await graphql.request(LOGIN, {
				data: {
					email: email,
					password: password,
				},
			})
			const data = res.login
			if (!data) {
				console.error(res.errors)
			} else {
				alert("Logged in!")
				Cookies.set('token', data.token)
				window.location.href = '/'
			}
		} catch (e) {
			console.error(e)
		}
		submitEnabled = true;
	}
</script>

<article>
	<header>
		<h1>Translate</h1>
	</header>
	<section class="intro">
		<div class="introHeader">
			<h3>Login</h3>
			<Icon height={'1.5rem'} width={'1.5rem'} icon={'account'}/>
		</div>
		<p>Hello, welcome back to your account!</p>
	</section>
	<section class="form">
		<label for="email">Email</label>
		<input type="text" id="emailInput" name="email" placeholder="Email address"/>
		<label for="password">Password</label>
		<input type="password" id="passwordInput" name="password" placeholder="Password"/>
		<a href="/forgotpassword">Forgot Password?</a>
		<button on:click={submitEnabled?tryLogin:null}>
			Login
		</button>
	</section>
	<hr>
	<section class="signup">
		<p>Don't have an account? <a href="/signup">Sign up</a></p>
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
			.introHeader {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				width: 100%;
				h3 {
					font-size: 1.5rem;
					text-align: left;
					font-weight: 500;
				}
			}
			p {
				font-size: 1rem;
				text-align: left;
				font-weight: 500;
				color: color('swr_green');
			}
		}
		.form {
			box-sizing: border-box;
			* {
				box-sizing: border-box;
			}
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 3rem;
			align-items: flex-end;
			justify-content: center;
			label {
				display: none;
			}
			input {
				width: 100%;
				height: 3rem;
				border-radius: 1rem;
				border: none;
				outline: none;
				padding: 0 1rem;
				margin: 0.5rem 0;
				font-size: 1rem;
				font-weight: 500;
				background-color: white;
			}	
			a {
				color: color('swr_blue');
			}
			button {
				width: 100%;
				height: 3rem;
				border-radius: 1rem;
				border: none;
				outline: none;
				padding: 0 1rem;
				margin: 0.5rem 0;
				font-size: 1rem;
				font-weight: 500;
				background-color: color('primary');
				color: white;
			}
		}
		hr {
			width: 100%;
			border: none;
			height: 1px;
			background-color: black;
			margin: 1rem;
		}
		.signup {
			width: 100%;
			p {
				font-size: 1rem;
				text-align: center;
				font-weight: 500;
				color: color('swr_green');
				a {
					color: color('swr_blue');
				}
			}
		}
	}
</style>
