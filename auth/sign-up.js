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
      if (!response.email.includes("@") || !response.email.includes(".com")) {
        console.log("Enter Proper Email...");
        return signUp();
      }
      const spinner = createSpinner("Searching existing user...");
      let currUser;
      try {
        spinner.start();
        currUser = await user.findOne({ email: response.email });
        spinner.stop();
      } catch (error) {
        console.log(error);
        spinner.clear();
      }
      if (currUser) {
        console.log("You are already registered please SignIn.");
        launchOptions();
      } else {
        inquirer
          .prompt([
            {
              type: "password",
              message: "Enter your Password (>=6 chatacters) ",
              name: "password",
            },
            {
              type: "text",
              message: "Enter your Name (Not NULL)",
              name: "name",
            },
            {
              type: "text",
              message: "Enter your Api Key (Not NULL)",
              name: "apiKey",
            },
          ])
          .then(async (ans) => {
            if (
              !ans.apiKey.length ||
              !ans.name.length ||
              ans.password.length < 6
            ) {
              console.log("Please enter proper Credentials");
              return signUp();
            }
            ans["email"] = response.email;
            ans.name = ans.name.trim();
            ans.apiKey = ans.apiKey.trim();
            ans.password = await bcrypt.hash(ans.password, 10);
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
