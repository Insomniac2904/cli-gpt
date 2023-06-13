require("dotenv").config();
const connectdb = require("./db/db");
const inquirer = require("inquirer");
const SignUpPage = require("./pages/signUp/sign-up-page");

async function start() {
  try {
    await connectdb(process.env.MONGODB_URI).then(() => {
      launchOptions();
    });
  } catch (error) {
    console.log(error);
  }
}

async function launchOptions() {
  inquirer
    .prompt({
      type: "list",
      name: "launchOptions",
      choices: ["SignIn", "SignUp", "Exit"],
    })
    .then(async (ans) => {
      if (ans.launchOptions == "SignIn") {
      }
      if (ans.launchOptions == "SignUp") {
        SignUpPage();
      }
      if (ans.launchOptions == "Exit") {
        console.log("Exiting Application");
        process.exit(0);
      }
    });
}

module.exports = launchOptions;
start();
