
module.exports.cAllActions = async (req, res) => {
  const user = req.user;

  if (!user) return res.status(500).json({ message: "server error" });

  const allActions = await user.getActions({
    attributes: ['title', 'body', 'img', 'id']
  });

  res.json(allActions);
}

module.exports.cSingleAction = async (req, res) => {
  const user = req.user;

  if (!user) return res.status(500).json({ message: "server error" });

  const action = (await user.getActions({
    attributes: ['title', 'body', 'img', 'id'],
    where: {
      id: req.params.id
    }
  }))[0];
  (action) ? res.json(action) : res.status(404).send("Not Found");
}

module.exports.cNewAction = async (req, res) => {
  const user = req.user;

  if (!user) return res.status(500).json({ message: "server error" });

  const title = req.body.title;
  const body = req.body.body;
  const file = req.file;

  if (file) {
    await user.createAction({
      title: title,
      body: body,
      img: file.filename
    });

    res.status(201).json({ created: true });
  } else {
    res.status(400).json({ created: false });
  }
}

module.exports.cDeleteAction = async (req, res) => {
  const user = req.user;
  const id = req.body.id;

  if (!user) return res.status(500).json({ message: "server error" });

  const action = (await user.getActions({
    attributes: ['title', 'body', 'img', 'id'],
    where: {
      id
    }
  }))[0];

  if (!action) return res.status(404).json({ deleted: false });

  try {
    await action.destroy();
    res.status(200).json({ deleted: true });
  } catch (err) {
    res.status(500).json({ deleted: false });
  }
}