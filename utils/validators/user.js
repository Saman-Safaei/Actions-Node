const { User } = require("../database/database").models;

async function isRegisterValid(username, password, email) {

  // check username
  if (username.length <= 3) return { is: false, message: "Username must be at least 4 characters." };
  if (/\W/.test(username)) return { is: false, message: "Username includes none word characters." };

  // check password
  if (password.length < 8) return { is: false, message: "Password must be at least 8 characters." };

  // check email
  if (!email.includes("@") || email.split("@").length !== 2) return { is: false, message: "Invalid email address." };

  const foundedUsername = await User.findOne({ where: { username } });
  if (foundedUsername) return { is: false, message: "This username is already exists." };

  const foundedEmail = await User.findOne({ where: { email } });
  if (foundedEmail) return { is: false, message: "This email is already exists."};

  return { is: true, message: "User details is valid." };
}

module.exports.isRegisterValid = isRegisterValid;