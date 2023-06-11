const user = require("../models/user");
const bcrypt = require("bcrypt");
const inquirer = require("inquirer");
const { createSpinner } = require("nanospinner");
const crypto = require("crypto");

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
        spinner.clear();
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
              type: "input",
              message: "Enter your Name (Not NULL)",
              name: "name",
            },
            {
              type: "input",
              message: "Enter your Api Key (Not NULL)",
              name: "apiKey",
            },
            {
              type: "input",
              message: "Enter secret Paraphrase ( DONOT SHARE )",
              name: "paraphrase",
            },
          ])
          .then(async (ans) => {
            if (
              !ans.apiKey.length ||
              !ans.name.length ||
              !ans.paraphrase.length ||
              ans.password.length < 6
            ) {
              console.log("Please enter proper Credentials");
              return signUp();
            }
            ans["email"] = response.email;
            ans.name = ans.name.trim();
            ans.apiKey = ans.apiKey.trim();
            ans.password = await bcrypt.hash(ans.password, 10);
            ans.paraphrase = encryptParaphrase(ans.paraphrase);
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

// symetric encryption code
const encryptParaphrase = (
  text,
  algo = process.env.ALGO,
  iv = process.env.IV_BYTES,
  rv = process.env.R_BYTES
) => {
  if (
    algo != process.env.ALGO ||
    iv != process.env.IV_BYTES ||
    rv != process.env.R_BYTES
  ) {
    //! todo change environment variables
  }
  const algorithm = algo;
  const initVector = crypto.randomBytes(iv);
  const message = text.trim();
  const Securitykey = crypto.randomBytes(rv);
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

module.exports = signUp;
