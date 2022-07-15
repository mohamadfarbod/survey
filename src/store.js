import { writable } from "svelte/store";
import { tweened } from 'svelte/motion'


export let final = writable([])
export const formHandler = writable(1);
export const isDone = writable(false);
export const userScore = writable(0);
export let allUserData = writable([])
export let qList = writable(
    [
        {
            qNo: '1',
            question: 'Am I smart?',
            answer1: 'Yes',
            answer2: 'No',
            currectAnswer: 'answer1',
        },
        {
            qNo: '2',
            question: 'Are you dumb?',
            answer1: 'Yes',
            answer2: 'No',
            currectAnswer: 'answer2',
        },
    ]
)
export let questionsList = writable([
    {
        id: 1,
        question:
            "Which of the following special symbol allowed in a variable name?",
        options: [
            "* (asterisk)",
            "| (pipeline)",
            "- (hyphen)",
            "_ (underscore)",
        ],
        correctIndex: 3,
    },

    {
        id: 2,
        question:
            "Which of the following special symbol allowed in a variable name?",
        options: [
            "* (asterisk)",
            "| (pipeline)",
            "- (hyphen)",
            "_ (underscore)",
        ],
        correctIndex: 3,
    },

    {
        id: 3,
        question:
            "Which of the following special symbol allowed in a variable name?",
        options: [
            "* (asterisk)",
            "| (pipeline)",
            "- (hyphen)",
            "_ (underscore)",
        ],
        correctIndex: 3,
    },
    {
        id: 4,
        question:
            "Which of the following special symbol allowed in a variable name?",
        options: [
            "* (asterisk)",
            "| (pipeline)",
            "- (hyphen)",
            "_ (underscore)",
        ],
        correctIndex: 3,
    },
    {
        id: 5,
        question:
            "Which of the following special symbol allowed in a variable name?",
        options: [
            "* (asterisk)",
            "| (pipeline)",
            "- (hyphen)",
            "_ (underscore)",
        ],
        correctIndex: 3,
    },

])

export let products = writable([
    {
        flag: "noob",
        bgColor: "orange",
        product: "Noob's product",
        url: "src/img/1.jpg",
        tmin: 0,
        tmax: 40,
    },
    {
        flag: "good",
        bgColor: "yellow",
        product: "Good's product",
        url: "src/img/2.jpg",
        tmin: 41,
        tmax: 70,
    },
    {
        flag: "pro",
        bgColor: "cyan",
        product: "Pro's product",
        url: "src/img/3.jpg",
        tmin: 71,
        tmax: 100,
    },
])
