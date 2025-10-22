// #!/usr/bin/env node
// import chalk from "chalk";
// import inquirer from "inquirer";
// import gradient from "gradient-string";
// import chalkAnimation from "chalk-animation";
// import figlet from "figlet";
// import { createSpinner } from "nanospinner";

// // Color style:
// console.log(chalk.green("Hello world")); // whatever color you add it will change your  text color
// console.log(chalk.bgBlue("Hello world")); // whatever color you add it will change your background color

// //Font Style
// console.log(chalk.bold("Welcome to bold world"));  // whatever text you add it will change your text style to bold
// console.log(chalk.italic("Italic text"));  // whatever text you add it will change your text style to italic
// console.log(chalk.underline("Underline text"));  // whatever text you add it will underline your text


// //Let's cook

// let playerName;

// const sleep = (ms = 4000) => {
//     return new Promise((resolve) => setTimeout(resolve, ms))
// }
// async function welcome() {
//     const karaokeTitle = chalkAnimation.neon( // there are rainbow, pulse, glitch, radar, neon, karaoke animations 
//         "Welcome to the game of life\n",
//     )
//     await sleep();
//     karaokeTitle.stop();

//     console.log(`${chalk.bgGreen("How to play")}
//     Cooking with Javascript and terminal
//     If you get any question, ${chalk.blue("do not hesitate to ask me")}`);

// }

// await welcome() // out of async is only possible for node 14.+ version

// async function askName() {
//     const answer = await inquirer.prompt({
//         name: "playerName",
//         type: "input",
//         message: "What is your name?",
//         default() {
//             return "player";
//         },
//     })

//     playerName = answer.playerName

// }

// await askName()

// async function question1() {
//     const answer = await inquirer.prompt({
//         name: "question",
//         type: "list",
//         message: "What do you want to do?",
//         choices: [
//             "Cutting",
//             "Cooking",
//             "Cleaning",
//             "Eating",
//             "Sleeping",
//             "Leaving",
//             "Ask for help",
//         ],
//     })

//     return handleAnswer(answer.question === "Cooking");
// }

// async function handleAnswer(correct) { // parameter for passing the right answer
//     const spinner = createSpinner("Checking answer....").start();
//     await sleep();

//     if (correct) {
//         spinner.success({ text: `Nice work ${playerName}` });
//         console.log(`${chalk.bgGreen("You are correct!")}`);
//     }
//     else {
//         spinner.error({ text: `💀💀💀 Game Over, you loose "${playerName}"` });
//         process.exit(1); // 0  is for success, 1 is for error
//     }

// }
// await question1()

// function winner() {
//     console.clear();
//     const msg = `congratulations ${playerName} !\n you have won\n $ 1, 00, 0 0 0`

//     figlet(msg, (err, data) => {
//         console.log(gradient.pastel.multiline(data));
//     })
// }

// await winner()





// 1. Welcome & rules
// 2. Ask name
// 3. Challenge 1: Pick the right ingredients
// 4. Challenge 2: Pick the right technique
// 5. Challenge 3: Final boss chef throws a twist
// 6. Win or lose with figlet + gradient
// 7. Ask to replay

// stage-2 of code
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";

let playerName;
let lives = 2;

const sleep = (ms = 2000) => new Promise((res) => setTimeout(res, ms));

async function welcome() {
  console.clear();
  console.log(
    chalk.greenBright(
      figlet.textSync("The Witcher's Trial", {
        font: "Standard",
      })
    )
  );

  console.log(`
  ${chalk.gray("You stand at the edge of Kaer Morhen...")}

  ${chalk.cyan("Gandalf the Grey")} greets you: 
  "So... you wish to walk the path of the Witcher?
   Prove yourself in the three trials — and beware, apprentice..."
  
  ${chalk.yellow("You have 2 lives. Lose both, and the path ends in darkness.")}\n`);
}

async function askName() {
  const answer = await inquirer.prompt({
    name: "playerName",
    type: "input",
    message: "What is your name, apprentice?",
    default() {
      return "Geralt Jr.";
    },
  });

  playerName = answer.playerName;
}

async function trialOfWisdom() {
  const answer = await inquirer.prompt({
    name: "riddle",
    type: "list",
    message: "🧠 Trial of Wisdom: Gandalf asks...\n" +
             chalk.italic("“I speak without a mouth and hear without ears. I have nobody, but I come alive with the wind.”\n") +
             "What am I?",
    choices: [
      "A Whisper",
      "A Shadow",
      "A Song",
      "A Dream",
    ],
  });

  return handleAnswer(answer.riddle === "A Whisper");
}

async function trialOfCombat() {
  const answer = await inquirer.prompt({
    name: "combat",
    type: "list",
    message: "⚔️ Trial of Combat: A ghoul lunges at you from the shadows!\nWhat do you do?",
    choices: [
      "Roll left and cast Igni",
      "Block with silver sword",
      "Drink Swallow potion",
      "Run away",
    ],
  });

  return handleAnswer(answer.combat === "Roll left and cast Igni");
}

async function trialOfFate() {
  const answer = await inquirer.prompt({
    name: "fate",
    type: "input",
    message: "🔮 Final Trial: Speak the ancient spell to open the Gate of Destiny.\n" +
             chalk.italic("(Hint: A powerful protection spell from Gandalf)"),
  });

  const correct = answer.fate.trim().toLowerCase() === "you shall not pass";

  return handleAnswer(correct);
}

async function handleAnswer(correct) {
  const spinner = createSpinner("Judging your fate...").start();
  await sleep();

  if (correct) {
    spinner.success({ text: `✨ Well done, ${playerName}!` });
  } else {
    spinner.error({ text: `❌ That was the wrong move.` });
    lives--;
    if (lives <= 0) {
      gameOver();
    } else {
      console.log(chalk.red(`You have ${lives} ${lives === 1 ? "life" : "lives"} remaining.`));
    }
  }
}

function gameOver() {
  console.log(chalk.bgRed(`\n💀 Your path ends here, ${playerName}. The Trial has claimed another.`));
  process.exit(1);
}

function winner() {
  console.clear();
  const msg = `WITCHER\n ${playerName.toUpperCase()}`;

  figlet(msg, (err, data) => {
    console.log(gradient.retro.multiline(data)); // Not rainbow
    console.log(chalk.greenBright(`\n🏆 You have passed all trials and earned your medallion, ${playerName}.`));
    console.log(chalk.cyan(`The Path is yours to walk — may the Signs guide you.`));
    askToReplay();
  });
}

async function askToReplay() {
  const answer = await inquirer.prompt({
    name: "replay",
    type: "confirm",
    message: "Do you want to walk the Path again?",
  });

  if (answer.replay) {
    lives = 2;
    await runGame();
  } else {
    console.log(chalk.gray("\nFarewell, Witcher. The Continent awaits..."));
    process.exit(0);
  }
}

async function runGame() {
  await welcome();
  await askName();
  await trialOfWisdom();
  await trialOfCombat();
  await trialOfFate();
  winner();
}

await runGame();






