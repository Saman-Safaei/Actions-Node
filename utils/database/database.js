const { Sequelize } = require("sequelize");
const path = require("path");

const databaseRelations = require("./database_relations");

const db = new Sequelize({
    dialect: "sqlite",
    storage: path.join(path.dirname(require.main.filename), "database.sqlite"),
    logging: false
});

const modelDefiners = [
    require("../../models").mAction,
    require("../../models").mUser
]

for (const modelDefiner of modelDefiners) {
    modelDefiner(db);
}

databaseRelations(db);

module.exports = db;