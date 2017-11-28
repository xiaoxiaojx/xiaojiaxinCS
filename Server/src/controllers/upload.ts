import { Request, Response } from "express";
export function uploadImg(req: any, res: Response) {
    const { filename } = req.file;
    if (filename) {
        res.send({
            message: "上传成功",
            error: false,
            data: `/${filename}`
        });
    } else {
        res.send({
            message: "上传失败",
            error: true,
            data: ""
        });
    }
}