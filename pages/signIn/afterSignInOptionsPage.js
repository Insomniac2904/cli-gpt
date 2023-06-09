const inquirer = require("inquirer");

const afterSignInPage = (launchOptions) => {
  inquirer
    .prompt({
      type: "list",
      name: "afterSignInPageOptions",
      choices: ["Change Details", "Chat", "LogOut"],
    })
    .then((answer) => {
      if (answer.afterSignInPageOptions == "Change Details") {
      }
      if (answer.afterSignInPageOptions == "Chat") {
      } else {
        launchOptions();
      }
    });
};
module.exports = afterSignInPage;
