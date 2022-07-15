<script>
    import { fade } from "svelte/transition";
    import { questions, allUserData, userScore } from "./../store.js";

    let userSelected;
    let score;
    const uniqueID = Math.floor(Math.random() * 600);
    let isDisabled = true;
    let pagehandler = -1;
    let answer = false;
    function answered() {
        answer = true;
        return answer;
    }

    function startNow() {
        pagehandler = 0;
        setTimeout(() => {
            let el = document.querySelector("#questionbox");
            el.style.display = "flex";
        }, 110);
    }

    function handleNext() {
        let current = document.querySelector("#questionbox");
        let nextSibling = current.nextElementSibling;
        if (nextSibling.style.display == "none") {
            console.log("im in if");
            current.style.display = "none";
            nextSibling.style.display = "flex";
            nextSibling = nextSibling.nextElementSibling;
        }
    }
    function saveData() {
        $allUserData = [userSelected, ...$allUserData];
        $userScore += score;
        handleNext();
        isDisabled = true;
    }
</script>

<section id="mainsec" class="flex flex-1 flex-wrap">
    {#if pagehandler == -1}
        <div class="start-screen flex justify-center flex-1">
            <button class="btn btn-accent" on:click={startNow}>Start now</button
            >
        </div>
    {:else if pagehandler < $questions.length}
        {#each $questions as question (question.id)}
            {#if question.id}
                <div
                    transition:fade={{ delay: 100, duration: 200 }}
                    id="questionbox"
                    class="questionbox card card-body bg-zinc-900 m-2 max-w-lg basis-full"
                >
                    <h1 class="font-mono font-bold text-orange-400">
                        Question{question.id}:
                    </h1>
                    <h1 class="font-mono font-bold card-title">
                        {question.question}
                    </h1>

                    <div class="pl-3" id={`group-${uniqueID}`}>
                        {#each question.choises as c, i}
                            <div>
                                <input
                                    on:change={() => (isDisabled = false)}
                                    id={`radio-${uniqueID}`}
                                    type="radio"
                                    class="radio radio-secondary hover:animate-pulse"
                                    bind:group={userSelected}
                                    value={c}
                                    on:input={() => {
                                        score = (i + 1) * 10;
                                        return score;
                                    }}
                                    on:input={answered}
                                />
                                <label for="radio">{c}</label>
                            </div>
                        {/each}
                    </div>

                    <button
                        disabled={isDisabled}
                        on:click={saveData}
                        on:click={() => {
                            pagehandler++;
                        }}
                        class="btn bg-gradient-to-r from-orange-700 to-amber-700 w-2/6 right-4 bottom-4 absolute"
                        >next</button
                    >
                </div>
            {/if}
        {/each}
    {:else}
        <div class="start-screen flex justify-center flex-1 flex-col">
            <p class="text-center">Your Score: {$userScore}</p>
            <button
                class="btn btn-accent basis-1/2"
                on:click={() => {
                    pagehandler = -1;
                    $userScore = 0;
                }}>reset</button
            >
        </div>
    {/if}
</section>

<style>
    /* .questionbox:not(:first-child) {
        display: none;
    } */
    /* #questionbox {
        display: none;
    } */
</style>
