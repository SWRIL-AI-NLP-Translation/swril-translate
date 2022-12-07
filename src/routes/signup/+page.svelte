<script lang="ts">
	import { COLORS } from '$lib/styles/colors';
	import { graphql } from '$lib/data/graphql';
	import Icon from '$lib/components/icons/Icon.svelte';
	import { CREATE_USER } from '$lib/data/mutations/createUser';
	import { goto } from '$app/navigation';
	import { Cookies } from '$lib/modules/cookies';

	let submitEnabled = true;

	let tryCreateAccount = async () => {
		submitEnabled = false;
		const firstNameInput:HTMLInputElement|null = document.querySelector("#firstNameInput");
		const lastNameInput:HTMLInputElement|null = document.querySelector("#lastNameInput");
		const emailInput:HTMLInputElement|null = document.querySelector("#emailInput");
		const passwordInput:HTMLInputElement|null = document.querySelector("#passwordInput");
		const confirmPasswordInput:HTMLInputElement|null = document.querySelector("#confirmPasswordInput");

		let [firstName, lastName, email, password, confirmPassword] = ['', '', '', '', ''];
		if (firstNameInput && lastNameInput && emailInput && passwordInput && confirmPasswordInput) {
			firstName = firstNameInput.value;
			lastName = lastNameInput.value;
			email = emailInput.value;
			password = passwordInput.value;
			confirmPassword = confirmPasswordInput.value;
			if (password !== confirmPassword) {
				alert("Passwords do not match");
				return;
			}
			if (firstName === '' || lastName === '' || email === '' || password === '') {
				alert("Please fill out all fields");
				return;
			}
		}
		else return
		try {
			const res = await graphql.request(CREATE_USER, {
				data: {
					first_name: firstName,
					last_name: lastName,
					email: email,
					password: password,
					phone_number: "1234567890",
				},
			})
			const data = res.createUser
			if (!data) {
				console.error(res.errors)
			} else {
				alert("Account created successfully")
				Cookies.set('token', data.token)
				goto('/')
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
			<h3>Create an account</h3>
		</div>
		<p>So you can start translating</p>
	</section>
	<section class="form">
		<label for="firstName">First Name</label>
		<input type="text" name="firstName" id="firstNameInput" placeholder="First Name"/>
		<label for="lastName">Last Name</label>
		<input type="text" name="lastName" id="lastNameInput" placeholder="Last Name"/>
		<label for="email">Email</label>
		<input type="text" name="email" id="emailInput" placeholder="Email address"/>
		<label for="password">Password</label>
		<input type="password" name="password" id="passwordInput" placeholder="Password"/>
		<label for="confirmPassword">Confirm Password</label>
		<input type="password" name="confirmPassword" id="confirmPasswordInput" placeholder="Password"/>
		<button on:click={submitEnabled?tryCreateAccount:null}>
			Create Account
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
			padding: 0 1rem;
			align-items: flex-end;
			justify-content: center;
			label {
				align-self: flex-start;
				// display: none;
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
