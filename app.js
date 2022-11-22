require("dotenv").config();

require("./db");

const express = require("express");
const app = express();

require('./config/session.config')(app)
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "Star-Wars-Fan-Page";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

require('./routes')(app)

require("./error-handling")(app);

module.exports = app;