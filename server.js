const express = require("express");
const cors = require("cors");

const db = require("./utils/database/database");
const { actionsRouter, usersRouter, filesRouter } = require("./routes");


async function createApp() {
    const server = express();
    const port = process.env.PORT || 3030;

    // setup cors
    server.use(cors({ origin: "*" }));
    // register routers
    server.use("/files", filesRouter);
    server.use(actionsRouter);
    server.use(usersRouter);

    await db.sync();
    server.listen(port, () => console.log("Server started at http://localhost:3030 ."));
}

module.exports.createApp = createApp;
