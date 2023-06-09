const user = require("../models/user");
const bcrypt = require("bcrypt");
const inquirer = require("inquirer");
const { createSpinner } = require("nanospinner");

async function signUp(launchOptions) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter your Email ",
        name: "email",
      },
    ])
    .then(async (response) => {
      // const spinner = createSpinner("Searching existing user...");
      let currUser;
      try {
        currUser = await user.findOne({ email: response.email });
      } catch (error) {
        console.log(error);
      }
      if (currUser) {
        console.log("You are already registered please SignIn.");
        launchOptions();
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
            // console.log(ans);
            const newUser = new user(ans);
            await newUser.save().then((result) => {
              console.log(
                "Congrats you have Successfully registered as a User..."
              );
              launchOptions();
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = signUp;
