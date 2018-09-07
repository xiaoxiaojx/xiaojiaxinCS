import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as multer from "multer";
import * as compression from "compression";

import * as Proxy from "./controllers/proxy";
import * as Test from "./controllers/test";
import * as Services from "./controllers";
import * as Articles from "./controllers/article";
import * as Upload from "./controllers/upload";

const app = express();
const upload = multer({ dest: "uploads/" });
const NODE_ENV = process.env.NODE_ENV;
const isDevelopment: boolean = NODE_ENV === "development";
console.log("Server run" + NODE_ENV);
const whitelist = ["http://xiaojiaxin.com", "https://xiaoxiaojx.github.io", "https://xiaoxiaojx.github.io/blog"];

mongoose.connect("mongodb://localhost:27017");
mongoose.connection.on("error", () => {
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
app.use(express.static(path.join(__dirname, "dist"), {maxAge: 31536000}));
app.use(express.static(path.join(__dirname, "uploads"), {maxAge: 31536000}));
app.use(express.static(path.join(__dirname, "asset"), {maxAge: 31536000}));

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