import { Request, Response } from "express";
import * as request from "request";

export const start = (req: Request, res: Response) => {
    if (req.query.real) {
        req.pipe(request(req.query.real)).pipe(res);
    } else {
        res.send({
            message: "代理参数设置错误!",
            error: true
        });
    }
};