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