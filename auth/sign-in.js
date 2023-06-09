const user = require("../models/user");
const bcrypt = require("bcrypt");
const inquirer = require("inquirer");
const afterSignInPage = require("../pages/signIn/afterSignInOptionsPage");

const signIn = (launchOptions) => {
  inquirer
    .prompt({
      type: "input",
      name: "email",
      mesage: "Enter email",
    })
    .then(async (ans) => {
      const currUser = await user.findOne({ email: ans.email });
      if (!currUser) {
        console.log("Sorry no user with this email exists, Please SignUp");
        launchOptions();
      } else {
        passwordInputAndCheck(launchOptions);
      }
    });
};
//? flow
//? sign in
//? ->go back
//? ->Login
//? if login chosen
//? ->email    .. email will be checked
//?            .. if email not found go back to launchOptions
//? ->password ..password comapre to hashed password in DB
//?            ..if password incorrct
//? -> go back .. back to launchOptions
//? ->retry    ..again email and password asked
//?            ..if password correct auth takes place

const passwordInputAndCheck = (launchOptions) => {
  inquirer
    .prompt({
      type: "password",
      name: "password",
      message: "Enter passwor to Login",
    })
    .then((ans) => {
      bcrypt.compare(ans.password, currUser.password, (err, res) => {
        if (err) {
          console.log("error: ");
          console.log("Incorrect Password");
          inquirer
            .prompt({
              type: "list",
              name: "signInFailOptions",
              choices: ["Go Back", "Retry"],
            })
            .then((res) => {
              if (res.signInFailOptions == "Go Back") launchOptions();
              else {
                signIn(launchOptions);
              }
            });
        } else {
          // apply authentication using jwt or any other method and call afterSignInPage()
        }
      });
    });
};
module.exports = signIn;
