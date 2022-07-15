<!-- <script>
	import { slide } from "svelte/transition";

	import { initializeApp } from "firebase/app";
	import { onMount } from "svelte";
	import { questionsList, final, products, qList } from "./../../store.js";

	import {
		getFirestore,
		doc,
		addDoc,
		collection,
		setDoc,
	} from "firebase/firestore";

	const firebaseApp = initializeApp(firebaseConfig);
	const db = getFirestore();
	const colRef = collection(db, "survey");

	let questions = [...$questionsList];
	let answers = new Array(questions.length).fill(null);
	let questionPointer = -1;
	const product = [...$products];

	const getScore = function (syncData) {
		let score = answers.reduce((acc, val, index) => {
			if (questions[index].correctIndex == val) {
				return acc + 1;
			}
			return acc;
		}, 0);
		$final = (score / questions.length) * 100;
		console.log($final);

		syncData();
		return $final;
	};

	async function getSynced() {
		await addDoc(collection(db, "survey"), {
			score: $final,
		});
	}

	function restartQuiz() {
		answers = new Array(questions.length).fill(null);
		questionPointer = 0;
	}
</script>

<div class="app container">
	{#if questionPointer == -1}
		<div class="start-screen">
			<button
				on:click={() => {
					questionPointer = 0;
				}}
			>
				Start Quiz
			</button>
		</div>
	{:else if !(questionPointer > answers.length - 1)}
		<div class="quiz-screen">
			<div
				transition:slide
				class="main m-10 rounded-lg bg-gradient-to-br from-emerald-800 to-green-900"
			>
				<div class=" card card-body rounded-md ">
					<h2 class="font-bold font-mono card-title">
						{questions[questionPointer].question}
					</h2>
				</div>
				<div class="options">
					{#each questions[questionPointer].options as opt, i}
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
						style="width:{(questionPointer / questions.length) *
							100}%"
					/>
				</div>
			</div>
		</div>
	{:else}
		<p>
			this product is suggested based on Your score: {getScore(
				getSynced
			)}%
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
										<h2 class="card-title">{product}</h2>
										<p>
											this product is suggested based on
											Your score: {getScore(getSynced)}%
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
		background: #4a77dc;
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
</style> -->
