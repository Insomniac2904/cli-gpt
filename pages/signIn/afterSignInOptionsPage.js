const inquirer = require("inquirer");
const changeDetails = require("./change-details");

const afterSignInPage = (launchOptions, currUser) => {
  inquirer
    .prompt({
      type: "list",
      name: "afterSignInPageOptions",
      choices: ["Change Details", "Chat", "LogOut"],
    })
    .then((answer) => {
      if (answer.afterSignInPageOptions == "Change Details") {
        changeDetails(afterSignInPage, currUser);
      }
      if (answer.afterSignInPageOptions == "Chat") {
        //! todo chat
      } else {
        logOut(currUser); //! TODO
        return launchOptions();
      }
    });
};

module.exports = afterSignInPage;
