require("dotenv").config();

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require('./config/session.config')(app)
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "Star-Wars-Fan-Page";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes")
app.use("/", authRoutes);

const userRoutes = require("./routes/user.routes")
app.use("/", userRoutes)

const characterRoutes = require("./routes/characters.routes")
app.use("/", characterRoutes)


require("./error-handling")(app);

module.exports = app;
