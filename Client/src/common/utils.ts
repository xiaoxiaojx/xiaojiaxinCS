import createHistory from "history/createHashHistory";
import {
    User,
    PublishArticlesRes
} from "../../services";
import {
    getApiPrefix
} from "../../services/webapi";
import {
    TITLE
} from "./constant";

/*
    如何改进这个方法不报错, 并且能检测传入属性的属性值是Function
    export function autoBindMethods<K extends string>(methods: K[], _self: { [key in K]: Function } | { [key: string]: any }): void {
        methods.forEach((method: K) => _self[method] = _self[method].bind(_self));
        // error TS2536: Type 'K' cannot be used to index type '{ [key in K]: Function; } | { [key: string]: any; }'
    }
*/

export function autoBindMethods<T, K extends keyof T>(methods: K[], _self: T): void {
    methods.forEach((method: K) => _self[method] = (_self[method] as any).bind(_self));
}

export function getElementByAttr<T extends HTMLElement>(tag, attr, value): T[] {
    const aElements = document.getElementsByTagName(tag);
    const aEle: T[] = [];
    for (let i = 0; i < aElements.length; i++) {
        if (aElements[i].getAttribute(attr).includes(value))
            aEle.push( aElements[i] );
    }
    return aEle;
}

export function redirect(path: string): void {
    const history = createHistory();
    history.push(path);
}

export function initKeyboardEvent (e: any): void {
    const keyCode = e.keyCode || e.which;
    const el = e.target;

    if (keyCode === 9) {
        let start = el.selectionStart,
            end = el.selectionEnd;

        el.value = el.value.substring(0, start)
                + "\t"
                + el.value.substring(end);
        e.preventDefault();
    }
}

export function replaceHtmlTag(str: string): string {
    return str.replace(/<[^>]*>/g, "");
}

export function getCompleteImgUrl(str: string): string {
    if (str[0] !== "/") {
        return str;
    }
    const apiPrefix = getApiPrefix();
    return apiPrefix.substr(0, apiPrefix.length - 5) + str;
}

export function throttle(handel: Function, time: number = 1000): (...arg: any[]) => void {
    let canTrigger: boolean = true;

    return (...arg) => {
        if (canTrigger) {
            canTrigger = false;
            handel(...arg);

            setTimeout(() => {
                canTrigger = true;
            }, time);
        }
    };
}

export function debounce(handel: Function, time: number = 1000): (...arg: any[]) => void {
    let setTimeId: any;

    return (...arg) => {
        clearTimeout(setTimeId);
        setTimeId = setTimeout(() => {
            handel(...arg);
        }, time);
    };
}

export function setDocumentTitle(title?: string): void {
    document.getElementsByTagName("title")[0].innerText = title || TITLE;
}

export function getFormatDate(): string {
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const date = nowDate.getDate();
    const hours = nowDate.getHours();
    const minutes = nowDate.getMinutes();
    return `${year}年${month}月${date}日 ${hours}时${minutes}分`
}

export function getLocalStorageData(): Partial<User> | boolean {
    let data: Partial<User> | boolean;
    try {
        data = JSON.parse(localStorage.getItem("qaqData") as any);
    }
    catch (err) {
        data =  false;
    }
    return data;
}

export function getLocalStorageArticlesData(): PublishArticlesRes[] {
    let data: PublishArticlesRes[] = [];
    try {
        data = JSON.parse(localStorage.getItem("articlesData") as any) || [];
    }
    catch (err) {
        data =  [];
    }
    return data;
}