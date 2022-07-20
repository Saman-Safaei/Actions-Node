const removeFile = require("../utils/database/file_remover");

// Get All Action Middleware ----------------------------------------
module.exports.cAllActions = async (req, res) => {
  const user = req.user;

  const allActions = await user.getActions({
    attributes: ["title", "body", "img", "id"],
  });

  res.json(allActions);
};

// Get a specific Action Middleware ---------------------------------
module.exports.cSingleAction = async (req, res) => {
  const user = req.user;

  const action = (
    await user.getActions({
      attributes: ["title", "body", "img", "id"],
      where: {
        id: req.params.id,
      },
    })
  )[0];
  action ? res.json(action) : res.status(404).send("Not Found");
};

// Create a new action with post method -----------------------------
module.exports.cNewAction = async (req, res) => {
  const user = req.user;

  const title = req.body.title;
  const body = req.body.body;
  const file = req.file;

  if (file) {
    await user.createAction({
      title: title,
      body: body,
      img: file.filename,
    });

    res.status(201).json({ created: true });
  } else {
    res.status(400).json({ created: false });
  }
};

// Delete an action with delete method ------------------------------
module.exports.cDeleteAction = async (req, res) => {
  const user = req.user;
  const id = req.body.id;

  const action = (
    await user.getActions({
      attributes: ["title", "body", "img", "id"],
      where: {
        id,
      },
    })
  )[0];

  if (!action) return res.status(404).json({ deleted: false });

  try {
    removeFile(action.img);
    await action.destroy();
    res.status(200).json({ deleted: true });
  } catch (err) {
    res.status(500).json({ deleted: false });
  }
};

// Edit an action with post method ----------------------------------
module.exports.cEditAction = async (req, res) => {
  const user = req.user;
  const id = req.body.id;
  const body = req.body.body;
  const title = req.body.title;

  if (
    title === undefined ||
    title === null ||
    body === undefined ||
    body === null ||
    id === undefined ||
    id === null
  )
    return res.status(400).json({ message: "Invalid params." });

  const action = (
    await user.getActions({
      attributes: ["title", "body", "id"],
      where: {
        id,
      },
    })
  )[0];

  if (!action) return res.status(404).json({ message: "Action not found." });

  action.title = title;
  action.body = body;

  try {
    await action.save();
  } catch (err) {
    return res.status(500).json({ message: "Server Error." });
  }

  res.json({ message: "Action successfully edited." });
};
