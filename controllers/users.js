const db = require("../utils/database/database");
const { sign } = require("../utils/auth");
const { UserValidator } = require("../utils/validators");

const { User } = db.models;


// require json parser. method: POST
module.exports.cRegister = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const isUserValid = await UserValidator.isRegisterValid(username, password, email);

  if (!isUserValid.is)
    return res.status(400).json({ created: false, message: isUserValid.message });

  try {
    await User.create({
      username,
      password,
      email
    });
    res.status(201).json({ created: true, message: "Registered Successfully. Now you can login." });
  } catch (err) {
    res.status(400).json({ created: false, message: "Register User Fail." });
  }
}

// require json parser. method: POST
module.exports.cLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    where: {
      username: username
    }
  });

  // check if user exists
  if (!user) return res.status(404).json({ message: "User not found." });
  // check the password is correct
  if (user.password !== password) return res.status(401).json({ message: "Password is not valid." });

  const token = sign({ id: user.id }, "96h");
  res.status(202).json({ token, username: user.username });
}