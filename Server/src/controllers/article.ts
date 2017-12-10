import { Request, Response } from "express";
import Article from "../models/Article";
import {
    quickGetUserInfo
} from "./quick";

declare var Promise;
const $findNot = {"__v": 0};

export const publishArticle = (req: Request, res: Response) => {
    const { userName, nickname, avatar, title, content, date, editor, chipType } = req.body;
    Article.insertMany({userName, nickname, avatar, title, content, date, editor, chipType}, (err, doc) => {
        if ( err ) throw err;
        if (doc) {
            res.send({
                message: "发表成功",
                error: false
            });
        }
        else {
            res.send({
                message: "发表失败",
                error: true
            });
        }
    });
};
export const getArticles = async (req: Request, res: Response) => {
    const { userName } = req.body;
    const filter = userName ? { userName } : {};
    const articleDocs = await new Promise((resolve, reject) => {
        Article.find(filter, $findNot, (err, docs) => {
            if ( err ) throw err;
            resolve(docs);
        });
    });
    const userInfos = await Promise.all(articleDocs.map(item => quickGetUserInfo(item["userName"])));
    const data = userInfos.map((item, index) => ({
        _id: articleDocs[index]["_id"],
        userName: articleDocs[index]["userName"],
        title: articleDocs[index]["title"],
        content: articleDocs[index]["content"],
        date: articleDocs[index]["date"],
        like: articleDocs[index]["like"].length,
        comment: articleDocs[index]["comment"].length,
        editor: articleDocs[index]["editor"],
        chipType: articleDocs[index]["chipType"],
        nickname: item["nickname"],
        avatar: item["avatar"],
        views: articleDocs[index]["views"],
    }));
    res.send({
        message: "查询成功",
        error: false,
        data
    });
};

export const getArticle = async (req: Request, res: Response) => {
    const { id } = req.body;
    const articleDoc = await new Promise((resolve, reject) => {
        Article.findOne({_id: id}, $findNot, (err, doc) => {
            if ( err ) throw err;
            resolve(doc);
        });
    });
    const userInfo = await quickGetUserInfo(articleDoc["userName"]);
    const likeData = await Promise.all(articleDoc.like.map( item => quickGetUserInfo(item["userName"])));
    const like = likeData.map( (item, index) =>  ({
        userName: item["userName"],
        nickname: item["nickname"],
        avatar: item["avatar"],
    }));
    const commentData = await Promise.all(articleDoc.comment.map( item => quickGetUserInfo(item["userName"])));
    const comment = commentData.map( (item, index) =>  ({
        userName: item["userName"],
        nickname: item["nickname"],
        avatar: item["avatar"],
        content: articleDoc.comment[index]["content"],
        date: articleDoc.comment[index]["date"]
    }));
    const data = {
        _id: articleDoc["_id"],
        userName: articleDoc["userName"],
        title: articleDoc["title"],
        content: articleDoc["content"],
        date: articleDoc["date"],
        like,
        comment,
        editor: articleDoc["editor"],
        chipType: articleDoc["chipType"],
        nickname: userInfo["nickname"],
        avatar: userInfo["avatar"],
        views: articleDoc["views"],
    };
    res.send({
        message: "查询成功",
        error: false,
        data
    });
};

export const setArticle = (req: Request, res: Response) => {
    const { id, reqData } = req.body;
    Article.update({_id: id}, {"$set": reqData}, (err, raw) => {
        if ( err ) throw err;
        if (raw) {
            res.send({
                message: "更新成功",
                error: false
            });
        }
        else {
            res.send({
                message: "更新失败",
                error: true
            });
        }
    });
};

export const delArticle = (req: Request, res: Response) => {
    const { id } = req.body;
    Article.remove({_id: id}, err => {
        if (!err) {
            res.send({
                message: "更新成功",
                error: false
            });
        }
        else {
            res.send({
                message: "更新失败",
                error: true
            });
        }
    });
};