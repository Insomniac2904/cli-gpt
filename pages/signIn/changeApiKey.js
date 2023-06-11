const inquirer = require("inquirer");
const bcrypt = require("bcrypt");
const changeApiKey = (currUser, changeDetails) => {
  inquirer
    .prompt({
      type: "input",
      name: "paraphrase",
      message: "Enter Secret Paraphrase",
    })
    .then((ans) => {
      const dbParaphrase = currUser.paraphrase;
      if (decrypt(dbParaphrase, ans.paraphrase)) {
        inquired
          .prompt({
            type: "input",
            name: "newpass",
            message: "Enter new Password",
          })
          .then(async (ans) => {
            if (!ans.newpass.length()) {
              // go back if new pass is empty
              return changeDetails();
            } else {
              ans.newpass = await bcrypt.hash(ans.newpass, 10);
              currUser.update({ password: newpass });
            }
          });
      } else {
        console.log("Sorry Incorrect Paraphrase");
        return afterSignInPage(); // ! check here might throw error here , not passing launchOptions
      }
    });
};

module.exports = changeApiKey;
