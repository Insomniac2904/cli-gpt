const inquirer = require("inquirer");
const changeName = require("./changeName");
const changeApiKey = require("./changeApiKey");
const changePassword = require("./changePassword");

const changeDetails = (currUser) => {
  inquirer
    .prompt({
      name: "ChangeDetailsOptions",
      type: "checkbox",
      choices: ["Name", "Password", "Api Key", "Go back"],
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
      } else {
        return signInPageOptions();
      }
    });
};

module.exports = changeDetails;
