const inquirer = require("inquirer");
const signIn = require("../../auth/sign-in");

const SignInPage = (launchOptions) => {
  inquirer
    .prompt({
      type: "list",
      name: "signInPageOptions",
      choices: ["Sign In", "Go back"],
    })
    .then((ans) => {
      if (ans.signInPageOptions == "Sign In") {
        signIn(launchOptions);
      } else {
        launchOptions();
      }
    });
};

module.exports = SignInPage;
