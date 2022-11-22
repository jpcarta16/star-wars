module.exports = app => {
    app.use("/", require("./index.routes"))
    app.use("/", require("./auth.routes"))
    app.use("/user", require("./user.routes"))
    app.use("/characters", require("./characters.routes"))
    app.use("/post", require("./post.routes"))
}