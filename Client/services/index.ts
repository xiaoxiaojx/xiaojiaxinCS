import {
    webapi
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