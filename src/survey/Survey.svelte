<script>
    import { isDone, userScore, formHandler } from "./../store.js";
    import { slide, fade } from "svelte/transition";
    import Form from "./Form.svelte";

    let results = [
        {
            flag: "noob",
            bgColor: "orange",
            product: "Noob's product",
            url: "src/img/1.jpg",
            tmin: 10,
            tmax: 22,
        },
        {
            flag: "good",
            bgColor: "yellow",
            product: "Good's product",
            url: "src/img/2.jpg",
            tmin: 23,
            tmax: 42,
        },
        {
            flag: "pro",
            bgColor: "cyan",
            product: "Pro's product",
            url: "src/img/3.jpg",
            tmin: 43,
            tmax: 66,
        },
    ];
    $: score = $userScore;
    let color;
    let startSurvey = false;
</script>

<div class="mockup-window border bg-base-300 ">
    <div class="flex justify-center px-4 py-16 bg-base-200">
        {#if !startSurvey}
            <button
                on:click={() => {
                    startSurvey = true;
                }}
                class="btn">Click here to start survey</button
            >
        {:else}
            <div
                transition:slide={{ delay: 100, duration: 1000 }}
                class=""
                class:done={$isDone === true}
            >
                <Form />
            </div>
        {/if}
        {#if $isDone}
            <div
                class="grid rounded-md p-4"
                style={`background-color:${color}`}
            >
                {#each results as { bgColor, product, tmax, tmin, url }}
                    {#if tmax > score && tmin < score}
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
                                            your score : {$userScore}
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
                <p />
            </div>
        {/if}
    </div>
</div>

<style>
    .done {
        display: none;
    }
</style>
