const inquirer = require("inquirer");
const bcrypt = require("bcrypt");

const changeApiKey = (currUser) => {
  inquirer
    .prompt({
      type: "input",
      name: "paraphrase",
      message: "Enter Secret Paraphrase",
    })
    .then((ans) => {
      const dbParaphrase = currUser.paraphrase;
      if (bcrypt.compare(ans.paraphrase.trim(), dbParaphrase)) {
        inquirer
          .prompt({
            type: "input",
            name: "newKey",
            message: "Enter new Api Key",
          })
          .then(async (ans) => {
            if (!ans.newKey.length()) {
              // go back if new pass is empty
              console.log("New Api Key was empty. Going back...");
              const changeDetails = require("./change-details");
              return changeDetails();
            } else {
              const newpass = await bcrypt.hash(ans.newpass.trim(), 10);
              await currUser.update({ password: newpass.trim() });
            }
          });
      } else {
        console.log("Incorrect Paraphrase! Going Back. ");
        const afterSignInPage = require("./afterSignInOptionsPage");
        return afterSignInPage();
      }
    });
};

//* TODO decrypt the paraphrase function

module.exports = changeApiKey;
