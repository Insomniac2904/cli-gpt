const inquirer = require("inquirer");
const signIn = require("../../auth/sign-in");

const SignInPage = () => {
  inquirer
    .prompt({
      type: "list",
      name: "signInPageOptions",
      choices: ["Sign In", "Go back"],
    })
    .then((ans) => {
      if (ans.signInPageOptions == "Sign In") {
        signIn();
      } else {
        const launchOptions = require("../../app");
        launchOptions();
      }
    });
};

module.exports = SignInPage;
