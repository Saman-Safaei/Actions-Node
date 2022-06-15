const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");

const mailGenerator = require("./mail_gen");


const saltRounds = 10;
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "xsamansafaeix@gmail.com",
    pass: process.env.GPASS
  }
});

module.exports.sendAuthMail = (username, email) => {
  const hashedMail = bcrypt.hashSync(email, saltRounds);
  const mail = mailGenerator(username, hashedMail);

  transporter.sendMail({
    from: "<hollow@gmail.com>",
    to: email,
    subject: "Actions - Auth yourself",
    text: "Actions-Vue service",
    html: mail
  }).catch(err => console.log(err));
}
