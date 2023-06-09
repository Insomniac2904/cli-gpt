const inquirer = require("inquirer");
const signUp = require("../../auth/sign-up");

const SignUpPage = (launchOptions) => {
  inquirer
    .prompt({
      type: "list",
      name: "signUpPageOptions",
      choices: ["New User", "Go back"],
    })
    .then((answer) => {
      if (answer.signUpPageOptions == "New User") {
        signUp(launchOptions);
      } else {
        launchOptions();
      }
    });
};
module.exports = SignUpPage;
