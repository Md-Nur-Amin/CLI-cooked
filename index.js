#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from  "chalk-animation";
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

const sleep = ( ms = 4000) =>{
    return new Promise((resolve)=> setTimeout(resolve, ms))
}
async function welcome(){
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