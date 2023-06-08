const user = require("../models/user");
const bcrypt = require("bcrypt");
const inquirer = require("inquirer");
const { createSpinner } = require("nanospinner");

async function signUp() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter your Email ",
        name: "email",
      },
    ])
    .then(async (response) => {
      const spinner = createSpinner("Searching existing user...");
      let currUser;
      try {
        spinner.start();
        currUser = await user.findOne({ email: response.email });
        spinner.stop();
        spinner.clear();
      } catch (error) {
        spinner.stop();
        spinner.clear();
        console.log(error);
      }
      if (currUser) {
        console.log("You are already registered please SignIn.");
      } else {
        inquirer
          .prompt([
            {
              type: "password",
              message: "Enter your Password ",
              name: "password",
            },
            {
              type: "text",
              message: "Enter your Name ",
              name: "name",
            },
            {
              type: "text",
              message: "Enter your Api Key",
              name: "apiKey",
            },
          ])
          .then(async (ans) => {
            ans["email"] = response.email;
            ans.password = await bcrypt.hash(ans.password, 10);
            console.log(ans);
            await user.save().then((ans, err) => {
              res.send("Congrats! You have successfully Registered. Login!");
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { signUp };
