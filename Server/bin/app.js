"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var multer = require("multer");
var compression = require("compression");
var Proxy = require("./controllers/proxy");
var Test = require("./controllers/test");
var Services = require("./controllers");
var Articles = require("./controllers/article");
var Upload = require("./controllers/upload");
var app = express();
var upload = multer({ dest: "uploads/" });
var NODE_ENV = process.env.NODE_ENV;
var isDevelopment = NODE_ENV === "development";
console.log("Server run" + NODE_ENV);
var whitelist = ["http://xiaojiaxin.com", "https://xiaoxiaojx.github.io", "https://xiaoxiaojx.github.io/blog"];
mongoose.connect("mongodb://localhost:27017");
mongoose.connection.on("error", function () {
    console.log("MongoDB connection error. Please make sure MongoDB is running...");
    process.exit();
});
if (isDevelopment) {
    console.log("Cross-domain access is allowed only in development mode, and hosts must be http://localhost:3333 !");
}
app.use(cors({ "origin": isDevelopment ? "http://localhost:3333" : whitelist }));
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist"), { maxAge: 31536000 }));
// prod
app.use(express.static(path.join(__dirname, "uploads"), { maxAge: 31536000 }));
// dev
app.use(express.static(path.join(__dirname, "../uploads"), { maxAge: 31536000 }));
app.use(express.static(path.join(__dirname, "asset"), { maxAge: 31536000 }));
app.get("/proxy", Proxy.start);
app.post("/api/test", Test.test);
app.post("/api/register", Services.register);
app.post("/api/login", Services.login);
app.post("/api/getUserInfo", Services.getUserInfo);
app.post("/api/setUserInfo", Services.setUserInfo);
app.post("/api/publishArticle", Articles.publishArticle);
app.post("/api/getArticles", Articles.getArticles);
app.post("/api/getArticle", Articles.getArticle);
app.post("/api/setArticle", Articles.setArticle);
app.post("/api/delArticle", Articles.delArticle);
app.post("/api/uploadImg", upload.single("avatar"), Upload.uploadImg);
module.exports = app;
