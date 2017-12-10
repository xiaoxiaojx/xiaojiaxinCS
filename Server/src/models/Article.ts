import * as mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    nickname: String,
    userName: String,
    avatar: String,
    title: String,
    content: String,
    like: Array,
    comment: Array,
    date: String,
    editor: String,
    views: Number,
    chipType: String
});

const Article = mongoose.model("Article", articleSchema);
export default Article;