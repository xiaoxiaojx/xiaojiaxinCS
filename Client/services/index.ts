import {
    webapi,
    getApiPrefix
} from "./webapi";

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

export type Editor = "富文本" | "Markdown";

export interface PublishArticleReq {
    title: string;
    editor: Editor;
    content: string;
    date: string;
    userName: string;
    nickname: string;
    avatar: string;
}

export interface GetArticlesReq {
    userName?: string;
}

export type GetArticlesRes = Result<PublishArticleReq[]>;

export interface GetArticleReq {
    id: string;
}

export type GetArticleRes = Result<PublishArticleReq>;

export function Register(data: RegisterReq): Promise<Result> {
    return webapi<Result>("register", data);
}

export function Login(data: LoginReq): Promise<Result> {
    return webapi<Result>("login", data);
}

export function GetUserInfo(data: GetUserInfoReq): Promise<GetUserInfoRes> {
    return webapi<GetUserInfoRes>("getUserInfo", data);
}

export function SetUserInfo(data: SetUserInfoReq): Promise<Result> {
    return webapi<Result>("setUserInfo", data);
}

export function PublishArticle(data: PublishArticleReq): Promise<Result> {
    return webapi<Result>("publishArticle", data);
}

export function GetArticles(data: GetArticlesReq): Promise<GetArticlesRes> {
    return webapi<GetArticlesRes>("getArticles", data);
}

export function GetArticle(data: GetArticleReq): Promise<GetArticleRes> {
    return webapi<GetArticleRes>("getArticle", data);
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