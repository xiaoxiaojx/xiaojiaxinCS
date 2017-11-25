import * as mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    nickname: String,
    userName: String,
    avatar: String,
    title: String,
    content: String,
    date: String
});

const Article = mongoose.model("Article", articleSchema);
export default Article;