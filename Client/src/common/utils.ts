import {
    User
} from "../../services";
export function getLocalStorageData(): Partial<User> | boolean {
    try {
        const data = JSON.parse(localStorage.getItem("qaqData") as any);
        return data;
    }
    catch (err) {
        return false;
    }
}