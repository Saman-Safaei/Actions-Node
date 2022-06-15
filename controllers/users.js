const bcrypt = require("bcrypt");

const db = require("../utils/database/database");
const { sign } = require("../utils/auth");
const { UserValidator } = require("../utils/validators");
const {sendAuthMail} = require("../utils/mail");

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
    sendAuthMail(username, email);

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
  // check is user authenticated
  if (!user.verified) return res.status(401).json({ message: "Your email is not verified." });

  const token = sign({ id: user.id }, "96h");
  res.status(202).json({ token, username: user.username });
}

// require nodemailer ... validate user email ... params: hash
module.exports.cAuth = async (req, res) => {
  // get list of users email
  const listOfUsers = await User.findAll({ where: { verified: false }, attributes: ['email', 'id'] });
  const hash = req.query.t; // get hash from query params
  let verifyProcessSuccessful = false;
  // Loop over not verified emails and validate it if hash is valid
  for(const user of listOfUsers) {
    const validated = bcrypt.compareSync(user.email, req.query.t);

    if (validated) {
      user.verified = true;
      await user.save();
      verifyProcessSuccessful = true;
      break;
    }

  }

  if (verifyProcessSuccessful) res.status(200).send("your email verified");
  else res.send("not successful");
}
