import createHistory from "history/createHashHistory";
import {
    User,
    PublishArticlesRes
} from "../../services";
import {
    getApiPrefix
} from "../../services/webapi";

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
        data = JSON.parse(localStorage.getItem("articlesData") as any);
    }
    catch (err) {
        data =  [];
    }
    return data;
}

export function autoBindMethods(methods: string[], _this) {
    methods.forEach(method => _this[method] = _this[method].bind(_this));
}

export function redirect(path: string) {
    const history = createHistory();
    history.push(path);
}

export function initKeyboardEvent (e: any) {
    const keyCode = e.keyCode || e.which;
    const el = e.target;

    if (keyCode === 9) {
        let start = el.selectionStart,
            end = el.selectionEnd;

        el.value = el.value.substring(0, start)
                + "\t"
                + el.value.substring(end);

//        el.selectionStart = el.selectionEnd = start + 1;

        e.preventDefault();
    }
}

export function replaceHtmlTag(str: string): string {
    return str.replace(/<[^>]*>/g, "");
}

export function getElementByAttr(tag, attr, value) {
    const aElements = document.getElementsByTagName(tag);
    const aEle: any[] = [];
    for (let i = 0; i < aElements.length; i++) {
        if (aElements[i].getAttribute(attr).includes(value))
            aEle.push( aElements[i] );
    }
    return aEle;
}

export function getCompleteImgUrl(str: string) {
    if (str[0] !== "/") {
        return str;
    }
    const apiPrefix = getApiPrefix();
    return apiPrefix.substr(0, apiPrefix.length - 5) + str;
}

export function throttle(handel: Function, time: number = 1000) {
    let canTrigger: boolean = true;

    return () => {
        if (canTrigger) {
            canTrigger = false;
            handel();

            setTimeout(() => {
                canTrigger = true;
            }, time);
        }
    };
}