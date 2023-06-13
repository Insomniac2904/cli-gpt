const { inquirer } = require("inquirer");

const chat = async (currUser) => {
  console.log("Hello there! How may I help?");
  while (ask()) {
    console.log(ask());
  }
  const SignInPage = require("./sign-in-page");
  console.log("Goodbye!");
  SignInPage();
};

const ask = () => {
  inquirer
    .prompt({
      type: "input",
      name: "question",
      message: "Enter Text Here:",
    })
    .then(async (ans) => {
      if (ans.question.toLowerCase.trim() == "exit") {
        return 0;
      } else {
        return await apiReq(ans.question);
      }
    });
};

const apiReq = async (text) => {
  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${currUser.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: text,
      max_token: 7,
    }),
  })
    .then(async (ans) => {
      const data = ans.json();
      return data.choices[0].text;
    })
    .catch((err) => {
      // in case of wrong api key
      console.log(err.message());
      return 0;
    });
};
module.exports = chat;
