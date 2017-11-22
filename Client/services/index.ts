import {
    webapi
} from "./webapi";

export interface Result {
    message: string;
    error: boolean;
}

export interface User {
    nickname: String;
    email: String;
    avatar: String;
    userName: String;
    password: String;
}

export function Register(data: Partial<User>): Promise<Result> {
    return webapi<Result>("register", data);
}

export function Login(data: Partial<User>): Promise<Result> {
    return webapi<Result>("login", data);
}