import {
    webapi,
    getApiPrefix
} from "./webapi";
import {
    ChipType
} from "../src/common/chips";

export interface Result<T = null> {
    message: string;
    error: boolean;
    data?: T;
}

export interface User {
    nickname: string;
    email: string;
    avatar: string;
    userName: string;
    password: string;
    selfIntroduction: string;
    sex: string;
}

export interface RegisterReq {
    nickname: string;
    userName: string;
    password: string;
}

export interface LoginReq {
    userName: string;
    password: string;
}

export interface GetUserInfoReq {
    userName: string;
}

export interface SetUserInfoReq {
    userName: string;
    nickname: string;
    email: string;
    avatar: string;
    selfIntroduction: string;
    sex: string;
}

export type GetUserInfoRes = Result<User>;

export enum Editor {
    RICHTEXT = "富文本",
    MARKDOWN = "Markdown"
}

export interface PublishArticleReq {
    title: string;
    editor: Editor;
    content: string;
    date: string;
    userName: string;
    chipType: ChipType;
    folder: string;
}

export interface PublishArticleRes {
    _id: string;
    title: string;
    editor: Editor;
    content: string;
    date: string;
    like: SimpleUserInfo[];
    comment: SimpleComment[];
    views: number;
    userName: string;
    nickname: string;
    avatar: string;
    chipType: ChipType;
    folder: string;
}

export interface PublishArticlesRes {
    _id: string;
    title: string;
    editor: Editor;
    content: string;
    date: string;
    like: number;
    comment: number;
    views: number;
    userName: string;
    nickname: string;
    avatar: string;
    chipType: ChipType;
    folder: string;
}

export interface GetArticlesReq {
    userName?: string;
}

export type GetArticlesRes = Result<PublishArticlesRes[]>;

export interface GetArticleReq {
    id: string;
}

export type GetArticleRes = Result<PublishArticleRes>;

export interface UpdateArticleReq {
    title: string;
    editor: Editor;
    content: string;
    date: string;
    like: SimpleUserInfo[];
    comment: SimpleComment[];
    views: number;
    chipType: ChipType;
    folder: string;
}

export interface SimpleUserInfo {
    userName: string;
    nickname?: string;
    avatar?: string;
}

export interface SimpleComment {
    userName: string;
    nickname?: string;
    avatar?: string;
    content: string;
    date: string;
}

export type SetArticleReq = {
    id: string;
    reqData: Partial<UpdateArticleReq>;
};

export interface DelArticleReq {
    id: string;
}

export function Register(parm: RegisterReq): Promise<Result> {
    return webapi<Result>("register", parm);
}

export function Login(parm: LoginReq): Promise<Result> {
    return webapi<Result>("login", parm);
}

export function GetUserInfo(parm: GetUserInfoReq): Promise<GetUserInfoRes> {
    return webapi<GetUserInfoRes>("getUserInfo", parm);
}

export function SetUserInfo(parm: SetUserInfoReq): Promise<Result> {
    return webapi<Result>("setUserInfo", parm);
}

export function PublishArticle(parm: PublishArticleReq): Promise<Result> {
    return webapi<Result>("publishArticle", parm);
}

export function GetArticles(parm: GetArticlesReq): Promise<GetArticlesRes> {
    return webapi<GetArticlesRes>("getArticles", parm);
}

export function GetArticle(parm: GetArticleReq): Promise<GetArticleRes> {
    return webapi<GetArticleRes>("getArticle", parm);
}

export function SetArticle(parm: SetArticleReq): Promise<Result> {
    return webapi<Result>("setArticle", parm);
}

export function DelArticle(parm: DelArticleReq): Promise<Result> {
    return webapi<Result>("delArticle", parm);
}

export function UploadImg(data)  {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        const formData = new FormData();
        request.responseType = "json";
        formData.append("avatar", data);
        request.open("post", `${getApiPrefix()}uploadImg`);
        request.onreadystatechange = () => {
            if ( request.readyState === 4 ) {
                resolve(request.response);
            }
        };
        request.send(formData);
    });
}