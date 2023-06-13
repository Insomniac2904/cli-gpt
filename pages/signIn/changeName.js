const inquirer = require("inquirer");

const changeName = (currUser) => {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      messag: "Enter new Username",
    })
    .then((resp) => {
      if (!resp.name.length()) {
        console.log("Username cannot be Empty.");
        return changeName(currUser);
      } else {
        currUser.update({ name: resp.name }).then((error) => {
          if (error) {
            console.log(error);
            const afterSignInPage = require("./afterSignInOptionsPage");
            return afterSignInPage();
          } else {
            console.log("Username successfully Updated.");
            const afterSignInPage = require("./afterSignInOptionsPage");
            return afterSignInPage();
          }
        });
      }
    });
};

module.exports = changeName;
