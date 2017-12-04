import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as multer from "multer";

import * as homeController from "./controllers/home";
import * as test from "./controllers/test";
import * as Services from "./controllers";
import * as Articles from "./controllers/article";
import * as Upload from "./controllers/upload";

const app = express();
const upload = multer({ dest: "uploads/" });
const NODE_ENV = process.env.NODE_ENV;
const isDevelopment: boolean = NODE_ENV === "development";

mongoose.connect("mongodb://localhost:27017");
mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running...");
  process.exit();
});

if (isDevelopment) {
  app.use(cors({ "origin": "http://localhost:3333" }));
  console.log("只有在开发模式中才允许跨域访问, 且主机必须为 http://localhost:3333 !");
}

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "uploads")));

app.get("/", homeController.index);
app.post("/api/test", test.test);
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