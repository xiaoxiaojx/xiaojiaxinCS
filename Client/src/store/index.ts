import { observable, useStrict, action } from "mobx";
import {
    getLocalStorageData
} from "../common/utils";
import {
    GetUserInfo,
    GetArticles,
    GetArticlesRes,
    User,
    PublishArticleReq
} from "../../services";

type Editor = "富文本" | "Markdown";

interface ArticleData {
    editor: Editor;
    title: string;
    quillVal: string;
    markVal: string;
}

useStrict(true);


const defaultArticleData: ArticleData = {
    editor: "富文本",
    title: "",
    quillVal: "",
    markVal: ""
};

class Store {
    constructor() {
        this.getLocalStorageQaqData();
        this.getArticles();
    }
    @observable public userInfo: Partial<User> | boolean = false;
    @action.bound public getUserInfo(userName?: string) {
        const qaqData = this.localStorageQaqData;
        if (qaqData || userName) {
            return   GetUserInfo({userName: userName ? userName : qaqData["userName"]})
                .then(result => {
                    this.userInfo = result.data;
                    return result;
                });
        }
        return Promise.reject("No login");
    }

    @observable public loadingIndexPage: boolean = false;

    @observable public articles: PublishArticleReq[] = [];
    @action.bound public getArticles(self?: boolean) {
        this.loadingIndexPage = true;
        const qaqData = this.localStorageQaqData;
        const filter = self ? { userName: qaqData["userName"] } : {};
        return GetArticles(filter)
            .then(action(
                (result: GetArticlesRes) => {
                    this.loadingIndexPage = false;
                    this.articles = result.data.reverse();
                    return result;
                }
            ));
    }

    @observable public showLoginRegisterModal: boolean = false;
    @action.bound public setShowLoginRegisterModal(data: boolean) {
        if (this.showLoginRegisterModal !== data)
            this.showLoginRegisterModal = data;
    }

    @observable public articleData: ArticleData = defaultArticleData;
    @action.bound public setArticleData(data: Partial<ArticleData>) {
        if (data.title && data.title.length > 50) {
            return;
        }
        if (data.quillVal && data.quillVal.length > 10000) {
            return;
        }
        if (data.markVal && data.markVal.length > 10000) {
            return;
        }
        this.articleData = { ...this.articleData, ...data };
    }
    @action.bound initArticleData() {
        this.articleData = defaultArticleData;
    }

    @observable public localStorageQaqData: Partial<User> | boolean = false;
    @action.bound public setLocalStorageQaqData(data: Partial<User> | boolean) {
        localStorage.setItem("qaqData", JSON.stringify(data));
        this.localStorageQaqData = data ? { avatar: this.userInfo["avatar"], ...(data as any)} : false;
    }
    @action.bound public getLocalStorageQaqData() {
        const data = getLocalStorageData();
        this.localStorageQaqData = data;
        if (data) {
            this.getUserInfo(data["userName"])
                .then(action(
                    result => {
                        this.localStorageQaqData = {avatar: result["data"].avatar, ...(data as any)};
                    }
                ));
        }
    }
}

export default Store;