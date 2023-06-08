const inquirer = require("inquirer");
const signUp = require("../auth/sign-up");
const launchOptions = require("../app");

const SignUpPage = () => {
  inquirer
    .prompt({
      type: "list",
      name: "signUpPageOptions",
      choices: ["New User", "Go back"],
    })
    .then((answer) => {
      if (answer.signUpPageOptions == "New User") {
        signUp();
      } else {
        launchOptions();
      }
    });
};
module.exports = { SignUpPage };
