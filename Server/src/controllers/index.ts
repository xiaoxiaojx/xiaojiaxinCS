import { Request, Response } from "express";
import User from "../models/User";

const $findNot = {"_id": 0, "__v": 0};

export const register = (req: Request, res: Response) => {
    const { userName, nickname, password } = req.body;
    User.findOne({userName: userName}, (err, existingUser) => {
        if ( err ) throw err;
        if (existingUser) {
            res.send({
                message: "该用户已存在",
                error: true
            });
        }
        else {
            User.insertMany({userName, nickname, password}, (err, doc) => {
                res.send({
                    message: "注册成功",
                    error: false
                });
            });
        }
    });
};

export const login = (req: Request, res: Response) => {
    const { userName, password } = req.body;
    User.findOne({userName, password}, (err, existingUser) => {
        if ( err ) throw err;
        if (existingUser) {
            res.send({
                message: "登录成功",
                error: false
            });
        }
        else {
            res.send({
                message: "账号或者密码错误",
                error: true
            });
        }
    });
};

export const getUserInfo = (req: Request, res: Response) => {
    const { userName } = req.body;
    User.findOne({userName}, $findNot, (err, existingUser) => {
        if ( err ) throw err;
        if (existingUser) {
            res.send({
                message: "查询成功",
                error: false,
                data: existingUser
            });
        }
        else {
            res.send({
                message: "查询错误",
                error: true,
                data: {}
            });
        }
    });
};

export const setUserInfo = (req: Request, res: Response) => {
    const { userName, nickname, email, avatar, selfIntroduction, sex } = req.body;
    const data = { nickname, email, avatar, selfIntroduction, sex };
    User.update({userName}, {"$set": data}, (err, raw) => {
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