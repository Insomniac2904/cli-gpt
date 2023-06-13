const inquirer = require("inquirer");
const changeDetails = require("./change-details");
const chat = require("./chat");

const afterSignInPage = (currUser) => {
  inquirer
    .prompt({
      type: "list",
      name: "afterSignInPageOptions",
      choices: ["Change Details", "Chat", "LogOut"],
    })
    .then((answer) => {
      if (answer.afterSignInPageOptions == "Change Details") {
        changeDetails(currUser);
      }
      if (answer.afterSignInPageOptions == "Chat") {
        chat(currUser);
      } else {
        logOut(currUser); //! TODO
        const launchOptions = require("../app");
        return launchOptions();
      }
    });
};

module.exports = afterSignInPage;
