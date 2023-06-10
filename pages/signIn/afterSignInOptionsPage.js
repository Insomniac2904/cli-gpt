const inquirer = require("inquirer");
const changeDetails = require("./change-details");

const afterSignInPage = (launchOptions) => {
  inquirer
    .prompt({
      type: "list",
      name: "afterSignInPageOptions",
      choices: ["Change Details", "Chat", "LogOut"],
    })
    .then((answer) => {
      if (answer.afterSignInPageOptions == "Change Details") {
        changeDetails(afterSignInPage);
      }
      if (answer.afterSignInPageOptions == "Chat") {
      } else {
        launchOptions();
      }
    });
};
module.exports = afterSignInPage;
