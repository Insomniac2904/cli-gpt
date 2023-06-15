const { Configuration, OpenAIApi } = require("openai");
const highlight = require("cli-highlight").highlight;
const inquirer = require("inquirer");
const nanospinner = require("nanospinner");

const apiReq = async (text) => {
  console.log(process.env.DEFAULT_API);
  const configuration = new Configuration({
    apiKey: process.env.DEFAULT_API,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: `${text}`,
      },
    ],
  });

  const response = completion.data.choices[0].message.content;
  if (
    response.includes("code" || "CODE" || "Code") ||
    text.includes("code" || "CODE" || "Code")
  )
    return highlight(response, { ignoreIllegals: true });
  else return response;
};

function askQuestion(question) {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "answer",
        message: question,
      },
    ])
    .then((answers) => answers.answer);
}

function typeWithDelay(text, delay) {
  return new Promise((resolve) => {
    let currentIndex = 0;

    function typeNextCharacter() {
      process.stdout.write(text[currentIndex]);
      currentIndex++;

      if (currentIndex < text.length) {
        setTimeout(typeNextCharacter, delay);
      } else {
        process.stdout.write("\n");
        resolve();
      }
    }

    typeNextCharacter();
  });
}

async function main() {
  while (true) {
    const userInput = await askQuestion("Enter prompt: ");
    if (userInput.toLowerCase().trim() === "exit") {
      console.log("Goodbye...");
      break; // Exit the while loop and end the program
    }
    var message;
    try {
      const messageSpinner = nanospinner
        .createSpinner("Waiting for response...")
        .start();

      message = await apiReq(userInput); // Replace with your API call

      messageSpinner.stop();
    } catch (error) {
      console.log(error);
    }

    const typingDelay = 20; // Delay between each character in milliseconds
    await typeWithDelay(message, typingDelay);
  }
}

// main();
module.exports = main();
