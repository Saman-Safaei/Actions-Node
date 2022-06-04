const express = require("express");
const cors = require("cors");

const db = require("./utils/database/database");
const { actionsRouter, usersRouter } = require("./routes");
const { relativePath } = require("./utils/relative_path");


async function createApp() {
    const server = express();
    const filesDir = relativePath("files");

    // setup cors
    server.use(cors({ origin: "*" }));
    // serve static files
    server.use("/files", express.static(filesDir));
    // register routers
    server.use(actionsRouter);
    server.use(usersRouter);

    await db.sync();
    server.listen(3030, () => console.log("Server started at http://localhost:3030 ."));
}

module.exports.createApp = createApp;