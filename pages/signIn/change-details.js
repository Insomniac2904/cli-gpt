const user = require("../models/user");
const inquirer = require("inquirer");

const changeDetails = (afterSignInPage, currUser) => {
  inquirer
    .prompt({
      name: "ChangeDetailsOptions",
      type: "checkbox",
      choices: ["Name", "Api Key", "Password"],
    })
    .then((ans) => {
      if (ans.changeDetailsOptions == "Name") {
        changeName(currUser);
      }
      if (ans.changeDetailsOptions == "Api Key") {
        changeApiKey(currUser);
      }
      if (ans.changeDetailsOptions == "Password") {
        changePassword(currUser);
      }
    });
};

module.exports = changeDetails;
