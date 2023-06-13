const inquirer = require("inquirer");
const bcrypt = require("bcrypt");

const changePassword = (currUser) => {
  inquirer
    .prompt({
      type: "input",
      name: "paraphrase",
      message: "Enter Secret Paraphrase",
    })
    .then((ans) => {
      const dbParaphrase = currUser.paraphrase;
      if (bcrypt.compare(ans.paraphrase, dbParaphrase)) {
        inquirer
          .prompt({
            type: "input",
            name: "newpass",
            message: "Enter new Password",
          })
          .then(async (ans) => {
            if (!ans.newpass.length()) {
              // go back if new pass is empty
              console.log("New Password was empty. Going back...");
              const changeDetails = require("./change-details");
              return changeDetails();
            } else {
              ans.newpass = await bcrypt.hash(ans.newpass, 10);
              await currUser.update({ password: newpass });
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

module.exports = changePassword;
