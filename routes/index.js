module.exports = app => {

    app.use("/", require("./index.routes"))
    app.use("/", require("./auth.routes"))
    app.use("/usuarios", require("./user.routes"))
    app.use("/personajes", require("./characters.routes"))
    app.use("/post", require("./post.routes"))
    app.use("/comentarios", require("./comment.routes"))

}