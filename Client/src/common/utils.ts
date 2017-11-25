import createHistory from "history/createHashHistory";
import {
    User
} from "../../services";

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