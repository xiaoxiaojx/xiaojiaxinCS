import { Request, Response } from "express";
import Article from "../models/Article";

const $findNot = {"__v": 0};

export const publishArticle = (req: Request, res: Response) => {
    const { userName, nickname, avatar, title, content, date, editor } = req.body;
    Article.insertMany({userName, nickname, avatar, title, content, date, editor}, (err, doc) => {
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

export const getArticles = (req: Request, res: Response) => {
    const { userName } = req.body;
    const filter = userName ? { userName } : {};
    Article.find(filter, $findNot, (err, doc) => {
        if ( err ) throw err;
        if (doc) {
            res.send({
                message: "查询成功",
                error: false,
                data: doc
            });
        }
        else {
            res.send({
                message: "查询失败",
                error: true,
                data: []
            });
        }
    });
};

export const getArticle = (req: Request, res: Response) => {
    const { id } = req.body;
    Article.findOne({_id: id}, $findNot, (err, doc) => {
        if ( err ) throw err;
        if (doc) {
            res.send({
                message: "查询成功",
                error: false,
                data: doc
            });
        }
        else {
            res.send({
                message: "查询失败",
                error: true,
                data: {}
            });
        }
    });
};