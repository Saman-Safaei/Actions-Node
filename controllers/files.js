const fs = require("fs");

const { relativePath } = require("../utils/relative_path");
const db = require("../utils/database/database");

const { User } = db.models;

// Require ParamAuth Middleware --- have a filename param
module.exports.cSendFile = async (req, res) => {
  const user = req.user;
  const filename = req.params.filename;
  const filepath = relativePath("files", filename);

  // check file exists or not
  if (!fs.existsSync(filepath))
    return res.status(404).json({ message: "File not found." });

  const fileRelativeToUser = await user.getActions({
    attributes: ["img"],
    where: { img: filename },
  }); // is User have this file to any action or not ?

  if (!fileRelativeToUser[0])
    return res
      .status(401)
      .json({ message: "You don't have access to this file." });

  res.sendFile(filepath);
};

// Download action image --------------------------------------------
module.exports.cDownloadActionImage = async (req, res) => {
  const user = req.user;
  const filename = req.params.filename;
  const filepath = relativePath("files", filename);

  // check file exists or not
  if (!fs.existsSync(filepath))
    return res.status(404).json({ message: "File not found" });

  const fileRelativeToUser = await user.getActions({
    attributes: ["img"],
    where: { img: filename },
  }); // is User have this file to any action or not ?

  if (!fileRelativeToUser[0])
    return res
      .status(401)
      .json({ message: "You don't have access to this file." });

  res.download(filepath);
};
