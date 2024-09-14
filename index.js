#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

// Color style:
console.log(chalk.green("Hello world")); // whatever color you add it will change your  text color
console.log(chalk.bgBlue("Hello world")); // whatever color you add it will change your background color

//Font Style
console.log(chalk.bold("Welcome to bold world"));  // whatever text you add it will change your text style to bold
console.log(chalk.italic("Italic text"));  // whatever text you add it will change your text style to italic
console.log(chalk.underline("Underline text"));  // whatever text you add it will underline your text


//Let's cook

let playerName;

const sleep = (ms = 4000) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
async function welcome() {
    const karaokeTitle = chalkAnimation.neon( // there are rainbow, pulse, glitch, radar, neon, karaoke animations 
        "Welcome to the game of life\n",
    )
    await sleep();
    karaokeTitle.stop();

    console.log(`${chalk.bgGreen("How to play")}
    Cooking with Javascript and terminal
    If you get any question, ${chalk.blue("do not hesitate to ask me")}`);

}

await welcome() // out of async is only possible for node 14.+ version

async function askName() {
    const answer = await inquirer.prompt({
        name: "playerName",
        type: "input",
        message: "What is your name?",
        default() {
            return "player";
        },
    })

    playerName = answer.playerName

}

await askName()

async function question1() {
    const answer = await inquirer.prompt({
        name: "question",
        type: "list",
        message: "What do you want to do?",
        choices: [
            "Cutting",
            "Cooking",
            "Cleaning",
            "Eating",
            "Sleeping",
            "Leaving",
            "Ask for help",
        ],
    })

    return handleAnswer(answer.question === "Cooking");
}

async function handleAnswer(correct) { // parameter for passing the right answer
    const spinner = createSpinner("Checking answer....").start();
    await sleep();

    if (correct) {
        spinner.success({ text: `Nice work ${playerName}` });
        console.log(`${chalk.bgGreen("You are correct!")}`);
    }
    else {
        spinner.error({ text: `💀💀💀 Game Over, you loose ${playerName}` });
        process.exit(1); // 0  is for success, 1 is for error
    }

}
await question1()

function winner() {
    console.clear();
    const msg = `congratulations ${playerName} !\n you have won\n $ 1, 00, 0 0 0`

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}

await winner()

