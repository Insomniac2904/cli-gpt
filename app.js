require("dotenv").config();
const connectdb = require("./db/db");
const inquirer = require("inquirer");
const SignUpPage = require("./pages/sign-up-page");

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
      if (ans.launchOptions == "Change Details") {
      }
      if (ans.launchOptions == "Exit") {
        console.log("exiting application");
        return;
      }
    });
}

module.exports = { launchOptions };
start();
