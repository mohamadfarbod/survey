<script>
	import { slide, fade } from "svelte/transition";
	import { final, products } from "./../../store.js";
	import { initializeApp } from "firebase/app";
	import { getDatabase, ref, onValue, update } from "firebase/database";

	let myQuestions = [];
	let myAnswers = [];
	let myScore = [];
	let username = "";
	// async function getlink() {
	// 	let url =
	// 		"https://survey-bcfe8-default-rtdb.europe-west1.firebasedatabase.app/";
	// 	let res = await fetch(url);
	// 	if (res.ok) {
	// 		return true;
	// 	} else {
	// 		console.log("false");
	// 		return false;
	// 	}
	// }
	// let promise = getlink();
	const fbConfig = {
		databaseURL:
			"https://survey-bcfe8-default-rtdb.europe-west1.firebasedatabase.app/",
	};

	const app = initializeApp(fbConfig);
	const database = getDatabase(app);
	const db = getDatabase();
	const qRef = ref(db, "questions/");
	const aRef = ref(db, "answers/");
	const cRef = ref(db, "answerScores/");

	onValue(qRef, async (snapshot) => {
		const fbQuestions = await snapshot.val();

		return (myQuestions = [...fbQuestions]);
	});

	onValue(aRef, async (snapshot) => {
		const fbAnswers = await snapshot.val();

		return (myAnswers = [...fbAnswers]);
	});

	onValue(cRef, async (snapshot) => {
		const fbScore = await snapshot.val();

		return (myScore = [...fbScore]);
	});

	let answers;
	answers = new Array(myAnswers.length).fill(null);
	let questionPointer = -1;
	const product = [...$products];

	const getScore = function () {
		let sum = [];
		for (let i = 0; i < myAnswers.length; i++) {
			for (let j = 0; j < answers.length; j++) {
				sum[i] = myScore[i][answers[j]];
			}
		}
		$final = sum.reduce((a, b) => a + b, 0);

		postData();
		return $final;
	};
	function postData() {
		const userData = {
			username: username,
			userscore: $final,
			answers: answers,
		};
		// const newPostKey = push(child(ref(db), "users")).key;
		const updates = {};
		updates["users/" + username] = userData;

		return update(ref(db), updates);
	}
	function restartQuiz() {
		answers = new Array(myAnswers.length).fill(null);
		questionPointer = 0;
	}
	let disabled = true;
</script>

<div class="app container">
	{#if questionPointer == -1}
		<div class="start-screen">
			<div in:fade={{ delay: 300, duration: 1000 }} class="grid">
				<h1 class="text-lg font-mono text-center">Hello and Welcome</h1>
				<label for="name" class="text-center mb-2"
					>please enter your name:
				</label>
				<input
					bind:value={username}
					on:keypress={(event) => {
						if (event.target.value == "") {
							disabled = false;
						}
					}}
					class="input input-accent mb-10"
					type="text"
					id="name"
				/>
				<button
					class="btn btn-disable bg-emerald-600"
					{disabled}
					on:click={() => {
						questionPointer = 0;
					}}
				>
					Start Quiz
				</button>
			</div>
		</div>
	{:else if !(questionPointer > myQuestions.length - 1)}
		<div class="quiz-screen">
			<div
				transition:slide
				class="main m-10 rounded-lg bg-gradient-to-br from-emerald-800 to-green-900"
			>
				<div class=" card card-body rounded-md ">
					<h2 class="font-bold font-mono card-title">
						{myQuestions[questionPointer]}
					</h2>
				</div>
				<div class="options">
					{#each myAnswers[questionPointer] as opt, i}
						<button
							class={answers[questionPointer] == i
								? "selected btn btn-primary"
								: "btn btn-accent"}
							on:click={() => {
								answers[questionPointer] = i;
							}}
						>
							{opt}
						</button>
					{/each}
				</div>
				<div class="buttons flex flex-1 justify-between">
					<button
						class="btn btn-ghost btn-sm border-none"
						disabled={questionPointer == 0}
						on:click={() => {
							questionPointer--;
						}}
					>
						Prev
					</button>
					<button
						class="btn btn-ghost btn-sm border-none"
						on:click={() => {
							questionPointer++;
						}}
					>
						Next
					</button>
				</div>
			</div>
			<div class="footer">
				<div class="progress-bar">
					<div
						style="width:{(questionPointer / myQuestions.length) *
							100}%"
					/>
				</div>
			</div>
		</div>
	{:else}
		<p class="text-center">
			this product is suggested based on Your score: {getScore()}%
		</p>
		<div transition:slide class="score-screen">
			<div class="container">
				{#each product as { bgColor, product, tmax, tmin, url }}
					{#if tmax >= $final && tmin <= $final}
						<div
							transition:slide
							class="grid rounded-md p-4"
							style={`background-color:${bgColor}`}
						>
							<h1
								class="text-center my-2  font-bold text-black
                font-mono text-4xl"
							>
								Survey Completed!
							</h1>

							<div class="flex flex-1 flex-wrap justify-center">
								<div class="card w-96 bg-base-100 shadow-xl">
									<figure class="px-10 pt-10">
										<img
											src={url}
											alt="Shoes"
											class="rounded-xl"
										/>
									</figure>
									<div
										class="card-body items-center text-center"
									>
										<h2 class="card-title">
											{product}
										</h2>
										<p>
											this product is suggested based on
											Your score: {getScore()}%
										</p>

										<div class="card-actions">
											<button class="btn btn-primary"
												>Buy Now</button
											>
										</div>
									</div>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
			<button on:click={restartQuiz}> Restart Quiz </button>
		</div>
	{/if}
</div>

<style>
	.app {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
	}
	.app > div {
		width: 100%;
		height: 100%;
	}
	.app .start-screen,
	.app .score-screen {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.app .start-screen button,
	.app .score-screen button {
		padding: 10px 20px;

		color: #eee;
		border: none;
		outline: none;
		border-radius: 20px;
		cursor: pointer;
	}
	.app .quiz-screen .main {
		padding: 50px;
	}
	.app .quiz-screen .main .options {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.app .quiz-screen .main .options button {
		width: 45%;
		border-radius: 20px;
		margin: 10px 0px;
	}
	.app .quiz-screen .main .options button.selected {
		background: #111;
		color: #eee;
	}
	.app .quiz-screen .footer {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #eee;
	}
	.app .quiz-screen .footer > div {
		margin: 0px 10px;
	}
	.app .quiz-screen .footer .progress-bar {
		width: 150px;
		height: 10px;
		background: #aaa;
		border-radius: 10px;
		overflow: hidden;
	}
	.app .quiz-screen .footer .progress-bar div {
		height: 100%;
		background: #4a77dc;
	}
	.app .score-screen {
		flex-direction: column;
	}
	.app .score-screen h1 {
		margin-bottom: 10px;
	}
</style>
