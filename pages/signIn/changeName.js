const inquirer = require("inquirer");

const changeName = (currUser, afterSignInPage) => {
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
            return afterSignInPage();
          } else {
            console.log("Username successfully Updated.");
            return afterSignInPage();
          }
        });
      }
    });
};

module.exports = changeName;
