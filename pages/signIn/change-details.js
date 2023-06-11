const inquirer = require("inquirer");
const changeName = require("./changeName");
const changeApiKey = require("./changeApiKey");
const changePassword = require("./changePassword");

const changeDetails = (signInPageOptions, currUser) => {
  inquirer
    .prompt({
      name: "ChangeDetailsOptions",
      type: "checkbox",
      choices: ["Name", "Api Key", "Password", "Go back"],
    })
    .then((ans) => {
      if (ans.changeDetailsOptions == "Name") {
        changeName(currUser, changeDetails);
      }
      if (ans.changeDetailsOptions == "Api Key") {
        changeApiKey(currUser, changeDetails);
      }
      if (ans.changeDetailsOptions == "Password") {
        changePassword(currUser, changeDetails);
      } else {
        return signInPageOptions();
      }
    });
};

module.exports = changeDetails;
