const user = require("../models/user");
const bcrypt = require("bcrypt");
const inquirer = require("inquirer");

const doHash = async (text) => {
  return bcrypt.hash(text, 10).then((hash) => {
    return hash;
  });
};

const signUp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter your Email ",
        name: "email",
      },
    ])
    .then(async (response) => {
      console.log(response.email);
      const currUser = await user.findOne({ email: response.email });
      console.log(currUser);
      if (currUser) {
        console.log("You are already registered please SignIn: ");
      } else {
        const details = inquirer.prompt([
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
        ]);
        details["email"] = response.email;
        details.password = await doHash(details.password);
        console.log(details);

        await user.save().then((data, err) => {
          if (err) console.log(err);
          else res.send("Congrats! You have successfully Registered. Login!");
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

signUp();
